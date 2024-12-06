const express=require('express')
const router=express.Router()
const protect=require('../middleware/authMiddleware')
const Community=require('../models/User/Community')
const CommunityMembership=require('../models/User/CommunityMembership')

// create a new community
router.post('/',protect,async (req,res)=>{
    const{name,description}=req.body
    try{
        const existingCommunity=await Community.findOne({name})
        if(existingCommunity){
            return res.status(400).json({message:'Community name already exists'})
        }
        const community=await Community.create({
            name,
            description,
            createdBy:req.user.id,
        })
        res.status(201).json({message:"Community created successfully",community})
    }
    catch(error){
        console.error(error)
        res.status(500).json({message:"Error creating community."})
    }
})

// fetch all communities
router.get('/',async(req,res)=>{
    try{
        const communities=await Community.find()
        res.status(200).json(communities)
    }
    catch(error){
        console.error(error)
        res.status(500).json({message:"error fetching communities"})
    }
})

  // check how many communties some one have joined
  router.get('/my-communities', protect, async (req, res) => {
    try {
      // Find all memberships for the logged-in user
      const memberships = await CommunityMembership.find({ user: req.user.id }).populate('community');

      if (!memberships.length) {
        return res.status(200).json({ message: 'You have not joined any communities.', communities: [] });
      }
  
      // Extract community details
      const communities = memberships.map(membership => membership.community);
  
      res.status(200).json({ message: 'Communities joined by user.', communities });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching joined communities.' });
    }
  });

// fetch a specific community by ID
router.get('/:id',async(req,res)=>{
    const{id}=req.params
    try{
        const community=await Community.findById(id)
        if(!community){
            return res.status(404).json({message:'Community not found'})
        }
        res.status(200).json(community)
    }
    catch(error){
        console.error(error)
        res.status(500).json({message:'error fetching community. '})
    }
})

// join a community
router.post('/:communityId/join',protect,async(req,res)=>{
    const {communityId}=req.params
    try{
        const membership=await CommunityMembership.findOne({
            user:req.user.id,
            community:communityId,
        })
        if(membership){
            return res.status(400).json({message:'You are already a member of this community'})
        }
        await CommunityMembership.create({
            user:req.user.id,
            community:communityId,
        })
        const community=await Community.findByIdAndUpdate(
            communityId,
            {$inc:{membersCount:1}},
            {new:true}
        )
        res.status(201).json({message:'joined community successfully',community})
    }catch(error){
        console.error(error)
        res.status(500).json({message:'error joining community'})
    }
})

//leaving community
router.delete('/:communityId/leave',protect,async(req,res)=>{
    const {communityId}=req.params
    try{
        const membership=await CommunityMembership.findByIdAndDelete({
            user:req.user.id,
            community:communityId,
        })
        if(!membership){
            return res.status(400).json({message:'you are not a member of this community '})
        }
        const community=await Community.findByIdAndUpdate(
            communityId,
            {$inc:{membersCount:-1}},
            {new:true}
        )
        res.status(200).json({message:'left the community successfully',community})

    }catch(error){
        console.error(error)
        res.status(500).json({message:'erroe leaving community'})
    }
})

// 6. Update a community (only creator can update)
router.put('/:id', protect, async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
  
    try {
      const community = await Community.findById(id);
  
      if (!community) {
        return res.status(404).json({ message: 'Community not found.' });
      }
  
      if (community.createdBy.toString() !== req.user.id) {
        return res.status(403).json({ message: 'You are not authorized to update this community.' });
      }
  
      community.name = name || community.name;
      community.description = description || community.description;
  
      const updatedCommunity = await community.save();
  
      res.status(200).json({ message: 'Community updated successfully.', updatedCommunity });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating community.' });
    }
  });
  
  // 7. Delete a community (only creator can delete)
router.delete('/:id', protect, async (req, res) => {
    const { id } = req.params;
  
    try {
      const community = await Community.findById(id);
  
      if (!community) {
        return res.status(404).json({ message: 'Community not found.' });
      }
  
      if (community.createdBy.toString() !== req.user.id) {
        return res.status(403).json({ message: 'You are not authorized to delete this community.' });
      }
  
      await community.remove();
  
      // Remove all memberships related to the community
      await CommunityMembership.deleteMany({ community: id });
  
      res.status(200).json({ message: 'Community deleted successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting community.' });
    }
  });
  


  
  module.exports = router;
  
