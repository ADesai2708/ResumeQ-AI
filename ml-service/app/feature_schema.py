from pydantic import BaseModel

class ResumeFeatures(BaseModel):
    skillsCount: int
    projectsCount: int
    internshipCount: int
    certificationCount: int
    metricsCount: int
    githubPresent: int
    linkedinPresent: int
    awsPresent: int
    dockerPresent: int
    redisPresent: int