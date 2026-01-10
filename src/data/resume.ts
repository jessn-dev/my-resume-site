export const aboutBento = {
    header: {
        title: "Beyond the Code",
        description: "💻 Engineer. 🥋 Martial Artist. 📸 Photographer. I bridge the gap between creative exploration and technical rigor. " +
            "From mastering the flow of a Jiu-Jitsu match to architecting secure digital environments, I am driven by a continuous improvement mindset. " +
            "My blueprint for success? Build, Secure, Document, and never stop learning."
    },
    cards: [
        {
            id: "engineering",
            title: "Full Stack Engineering",
            description: "With years of experience in the Java and Python ecosystems, I have progressed from writing code to creating reliable digital infrastructure. " +
                "I focus on building scalable solutions that handle complex business logic while maintaining a strong security stance, ensuring systems perform well under pressure.",
            tags: ["Java", "Python", "Next.js", "TypeScript", "PostgreSQL", "AWS"],
            className: "md:col-span-2",
            icon: "Code2"
        },
        {
            id: "lab",
            title: "The Home Lab",
            description: "I maintain a fully segmented home lab designed to simulate real-world threats. " +
                "This environment allows me to rigorously experiment with networking, virtualization, and penetration testing while analyzing attack vectors firsthand.",
            className: "md:col-span-1",
            icon: "Server"
        },
        {
            id: "security",
            title: "Security First",
            description: "Code is only as good as it is secure. I actively study cybersecurity principles (currently exploring CySA+ topics, and my Masters Degree) " +
                "to ensure applications are hardened against modern vulnerabilities from day one.",
            className: "md:col-span-1",
            icon: "ShieldCheck"
        },
        {
            id: "devops",
            title: "DevOps & CI/CD",
            description: "Automating the boring stuff allows us to focus on innovation. I build robust pipelines ensuring smooth, " +
                "automated deployments from initial commit to production environments.",
            className: "md:col-span-1",
            icon: "Terminal"
        },
        {
            id: "discipline",
            title: "Discipline",
            description: "Martial arts and clean code share a common DNA: discipline and iteration. I apply a 'progressive overload' " +
                "mindset to my development stack, constantly pushing for more resilient results.",
            className: "md:col-span-1",
            icon: "Dumbbell"
        }
    ]
};

export const experiences = [
    {
        id: 0,
        company: "Combs Enterprise",
        role: "DevOps Engineer",
        period: "Aug 2022 - Mar 2023",
        description: "Spearheaded SCM evaluation and implemented new CI/CD pipelines using Jenkins and GitHub. " +
            "Automated infrastructure provisioning with Terraform and managed high-availability Kubernetes clusters with Splunk monitoring.",
        tags: ["Jenkins", "Terraform", "Kubernetes", "Splunk", "GitHub"],
    },
    {
        id: 1,
        company: "84.51°",
        role: "Software Engineer",
        period: "Sep 2018 - June 2022",
        description: "Developed scalable APIs in Java and Python while managing Azure infrastructure via Terraform. " +
            "Built CI/CD pipelines with Azure DevOps and implemented real-time monitoring using Prometheus and Grafana.",
        tags: ["Java", "Python", "Azure DevOps", "Helm", "Prometheus"],
    },
    {
        id: 2,
        company: "PCCW Global",
        role: "Senior Solutions Developer",
        period: "Mar 2018 - June 2018",
        description: "Led the modernization of a mission-critical government application into a scalable microservices " +
            "architecture using Spring MVC and Angular 6. Provided technical oversight to ensure code quality and security.",
        tags: ["Spring MVC", "Angular 6", "Microservices", "Java"],
    },
    {
        id: 3,
        company: "Accenture",
        role: "App Dev Analyst",
        period: "Sep 2017 - Feb 2018",
        description: "Implemented REST API services and modernized legacy SOAP web services. Developed internal tools using Spring Boot and Angular, " +
            "increasing test coverage by 70% for new functionalities.",
        tags: ["Spring Boot", "Angular", "REST APIs", "SOAP"],
    },
    {
        id: 4,
        company: "OpenText",
        role: "Product Support Specialist",
        period: "Apr 2017 - Sep 2017",
        description: "Provided comprehensive production support for EDI transactions and Oracle databases. " +
            "Improved system reliability through automation and streamlined access to archived financial statements.",
        tags: ["EDI", "Oracle DB", "Automation", "SQL"],
    },
    {
        id: 5,
        company: "Texas Instruments",
        role: "Applications Developer",
        period: "Mar 2016 - Apr 2017",
        description: "Developed internal web applications using Spring MVC, Hibernate, and Oracle. " +
            "Optimized SQL queries to reduce data extraction time from 5 minutes to 2 minutes.",
        tags: ["Java", "Hibernate", "Spring MVC", "SQL Optimization"],
    },
];

export const experience = [
    {
        role: "Senior DevOps Engineer",
        company: "Tech Solutions Inc.",
        period: "2022 — Present",
        location: "Chicago, IL",
        description: [
            "Architected and maintained scalable CI/CD pipelines using GitLab CI and Jenkins, reducing deployment time by 40%.",
            "Managed Kubernetes clusters on AWS EKS, ensuring 99.9% uptime for production workloads.",
            "Implemented automated security scanning (SAST/DAST) into the development lifecycle.",
        ],
    },
    {
        role: "Full Stack Developer",
        company: "Digital Dynamics",
        period: "2019 — 2022",
        location: "Naperville, IL",
        description: [
            "Developed responsive web applications using React, Next.js, and Java Spring Boot.",
            "Optimized database queries in PostgreSQL, leading to a 30% improvement in application response times.",
            "Collaborated with UX designers to implement intuitive interfaces for complex data dashboards.",
        ],
    },
];

export const philosophyData = {
    command: "jbn --philosophy",
    output: [
        "> [EXECUTION START]",
        "> 1. BUILD: Scalable Architecture",
        "> 2. SECURE: Defensive Engineering",
        "> 3. DOCUMENT: Technical Clarity",
        "> 4. LEARN: Continuous Iteration",
        "> [STATUS: HARDENED]"
    ]
};

export const schools = [
    {
        school: "Western Governors University",
        degree: "Master of Science in Cybersecurity and Information Assurance",
        period: "In Progress",
        link: "https://www.wgu.edu/"
    },
    {
        school: "University of the Cordilleras",
        degree: "Bachelor of Science in Information Technology",
        period: "2012 - 2015",
        link: "https://www.uc-bcf.edu.ph/"
    }
];

export const certificates = [
    {
        name: "ISC2 Certified in Cybersecurity",
        date: "2024"
    },
    {
        name: "CompTIA CySA+ (In Progress)",
        date: "Expected 2026"
    },
    {
        name: "CompTIA PenTest+ (In Progress)",
        date: "Expected 2026"
    }
];