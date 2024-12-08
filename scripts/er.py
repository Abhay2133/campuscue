from graphviz import Digraph

# Create a new directed graph
er_diagram = Digraph(format="png")
er_diagram.attr(rankdir="LR", size="10,8")

# Define entities
entities = [
    ("User", "Users in the system."),
    ("Answer", "Answers to questions."),
    ("Question", "Questions asked by users."),
    ("Post", "Posts created by users."),
    ("Community", "Communities users can create or join."),
    ("CommunityMembership", "Links users to communities."),
    ("Vote", "Tracks upvotes and downvotes."),
]

# Add entities to the diagram
for entity, label in entities:
    er_diagram.node(entity, label=f"{entity}\n{label}", shape="ellipse")

# Define relationships
relationships = [
    ("User", "Answer", "Creates", "1:N"),
    ("User", "Question", "Creates", "1:N"),
    ("User", "Post", "Creates", "1:N"),
    ("User", "Community", "Creates", "1:N"),
    ("User", "CommunityMembership", "Participates", "1:N"),
    ("User", "Vote", "Casts", "1:N"),
    ("Answer", "Question", "Refers to", "N:1"),
    ("Question", "Answer", "Has", "1:N"),
    ("Community", "CommunityMembership", "Has members", "1:N"),
    ("Vote", "Question", "Targets", "N:1"),
    ("Vote", "Answer", "Targets", "N:1"),
    ("Vote", "Post", "Targets", "N:1"),
]

# Add relationships to the diagram
for src, dst, label, cardinality in relationships:
    er_diagram.edge(src, dst, label=f"{label} ({cardinality})")

# Render the diagram
output_path = "/mnt/data/er_diagram"
er_diagram.render(output_path, format="png", cleanup=True)

output_path + ".png"
