import pandas as pd
import numpy as np

np.random.seed(42)

rows = []

for _ in range(10000):

    skills = np.random.randint(1, 21)

    projects = np.random.randint(0, 6)

    internships = np.random.randint(0, 3)

    certifications = np.random.randint(0, 6)

    metrics = np.random.randint(0, 11)

    github = np.random.randint(0, 2)

    linkedin = np.random.randint(0, 2)

    aws = np.random.randint(0, 2)

    docker = np.random.randint(0, 2)

    redis = np.random.randint(0, 2)

    score = (
        skills * 2
        + projects * 5
        + internships * 10
        + certifications * 2
        + metrics * 3
        + github * 3
        + linkedin * 2
        + aws * 4
        + docker * 4
        + redis * 3
    )

    score = min(score, 100)

    rows.append([
        skills,
        projects,
        internships,
        certifications,
        metrics,
        github,
        linkedin,
        aws,
        docker,
        redis,
        score
    ])

df = pd.DataFrame(
    rows,
    columns=[
        "skillsCount",
        "projectsCount",
        "internshipCount",
        "certificationCount",
        "metricsCount",
        "githubPresent",
        "linkedinPresent",
        "awsPresent",
        "dockerPresent",
        "redisPresent",
        "score"
    ]
)

df.to_csv(
    "../data/generated_dataset.csv",
    index=False
)

print("Dataset Generated Successfully")