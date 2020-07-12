CREATE TABLE thoughts
(
    thought_id SERIAL PRIMARY KEY,
    description VARCHAR(255),
    mood VARCHAR(255),
    automaticthought VARCHAR(255),
    supportingfacts VARCHAR(255),
    contradictfacts VARCHAR(255),
    realisticthought VARCHAR(255),
    rateyourfeeling int
)