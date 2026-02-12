// --- 2. Profile Management & 6. Dashboard (Simulated) ---

// Dummy data for simulation
let jobs = [
    { "id": 1, "title": "Frontend Intern", "company": "Wipro", "location": "Pune (Remote/On-site)", "salary": "28k-38k", "description": "Assist in building responsive web UIs with React and modern CSS.", "applications": [] },
    { "id": 2, "title": "Backend Intern", "company": "TCS (Tata Consultancy Services)", "location": "Bengaluru (On-site)", "salary": "30k-40k", "description": "Work on REST APIs and microservices with Node.js/Express.", "applications": [] },
    { "id": 3, "title": "Full Stack Intern", "company": "Infosys", "location": "Gurugram (On-site)", "salary": "32k-45k", "description": "Contribute to frontend and backend features in a cloud environment.", "applications": [] },
    { "id": 4, "title": "DevOps Intern", "company": "HCLTech", "location": "Pune (Remote/On-site)", "salary": "30k-42k", "description": "Help automate CI/CD and manage container workflows (Docker/K8s).", "applications": [] },
    { "id": 5, "title": "Data Science Intern", "company": "Amazon ", "location": "Hyderabad (On-site)", "salary": "34k-44k", "description": "Work with datasets to build ML models and exploratory analysis.", "applications": [] },
    { "id": 6, "title": "Machine Learning Intern", "company": "Wipro", "location": "Chennai (On-site)", "salary": "36k-48k", "description": "Experiment with neural models and assist with model deployment.", "applications": [] },
    { "id": 7, "title": "QA Intern", "company": "TCS (Tata Consultancy Services)", "location": "Mumbai (On-site)", "salary": "26k-36k", "description": "Write test cases and automate test suites for web applications.", "applications": [] },
    { "id": 8, "title": "Mobile Dev Intern", "company": "Cognizant", "location": "Noida (On-site)", "salary": "30k-40k", "description": "Develop React Native components and mobile UI flows.", "applications": [] },
    { "id": 9, "title": "UI/UX Intern", "company": "Capgemini", "location": "Pune (Remote/On-site)", "salary": "25k-35k", "description": "Design interfaces and perform usability testing with users.", "applications": [] },
    { "id": 10, "title": "Security Intern", "company": "Microsoft", "location": "Kolkata (On-site)", "salary": "32k-42k", "description": "Assist in vulnerability assessments and secure coding reviews.", "applications": [] },
    { "id": 11, "title": "Database Intern", "company": "Google", "location": "Bengaluru (On-site)", "salary": "34k-44k", "description": "Learn database administration tasks for Postgres and MySQL.", "applications": [] },
    { "id": 12, "title": "Systems Intern", "company": "HCLTech", "location": "Gurugram (On-site)", "salary": "33k-43k", "description": "Work on system-level tooling and performance profiling.", "applications": [] },
    { "id": 13, "title": "Cloud Engineer Intern", "company": "Accenture", "location": "Pune (Remote/On-site)", "salary": "35k-50k", "description": "Support cloud infra, IaC with Terraform and AWS.", "applications": [] },
    { "id": 14, "title": "Product Manager Intern", "company": "Infosys", "location": "Mysore (On-site)", "salary": "28k-38k", "description": "Assist product teams with roadmaps and user research.", "applications": [] },
    { "id": 15, "title": "SRE Intern", "company": "Cisco", "location": "Hyderabad (On-site)", "salary": "36k-48k", "description": "Monitor production services and improve reliability.", "applications": [] },
    { "id": 16, "title": "Network Engineer Intern", "company": "Microsoft", "location": "Mumbai (On-site)", "salary": "30k-40k", "description": "Support networking tasks and infrastructure troubleshooting.", "applications": [] },
    { "id": 17, "title": "AI Research Intern", "company": "TCS (Tata Consultancy Services)", "location": "Pune (Remote/On-site)", "salary": "40k-55k", "description": "Research on ML algorithms and prototype models.", "applications": [] },
    { "id": 18, "title": "Embedded Systems Intern", "company": "Siemens", "location": "Kolkata (On-site)", "salary": "34k-44k", "description": "Work on firmware and embedded C/C++ projects.", "applications": [] },
    { "id": 19, "title": "Game Dev Intern", "company": "Microsoft India", "location": "Noida (On-site)", "salary": "30k-42k", "description": "Develop game features and graphics rendering code.", "applications": [] },
    { "id": 20, "title": "Site Reliability Intern", "company": "Wipro", "location": "Chennai (On-site)", "salary": "36k-50k", "description": "Improve system availability and incident response processes.", "applications": [] },
    { "id": 21, "title": "Support Engineer Intern", "company": "Capgemini", "location": "Pune (Remote/On-site)", "salary": "24k-34k", "description": "Provide technical support for onboarding customers.", "applications": [] },
    { "id": 22, "title": "Business Analyst Intern", "company": "Microsoft", "location": "Bengaluru (On-site)", "salary": "28k-38k", "description": "Analyze business requirements and assist with reports.", "applications": [] },
    { "id": 23, "title": "Security Analyst Intern", "company": "Deloitte", "location": "Ahmedabad (On-site)", "salary": "34k-44k", "description": "Monitor alerts and assist in SOC operations.", "applications": [] },
    { "id": 24, "title": "DevOps Engineer Intern", "company": "Tech Mahindra", "location": "Gurugram (On-site)", "salary": "34k-46k", "description": "Automate deployments and build CI workflows.", "applications": [] },
    { "id": 25, "title": "Frontend Developer", "company": "Cognizant", "location": "Pune (Remote/On-site)", "salary": "45k-60k", "description": "Build modern web apps using React and TypeScript.", "applications": [] },
    { "id": 26, "title": "Backend Developer", "company": "Samsung R&D", "location": "Hyderabad (On-site)", "salary": "48k-65k", "description": "Design scalable services and APIs in Node/Python.", "applications": [] },
    { "id": 27, "title": "Full Stack Developer", "company": "Infosys", "location": "Mumbai (On-site)", "salary": "50k-70k", "description": "Work across frontend and backend to deliver features.", "applications": [] },
    { "id": 28, "title": "Data Engineer", "company": "IBM", "location": "Noida (On-site)", "salary": "55k-75k", "description": "Develop ETL pipelines and data warehouses.", "applications": [] },
    { "id": 29, "title": "ML Engineer", "company": "L&T Infotech (LTI)", "location": "Pune (Remote/On-site)", "salary": "60k-85k", "description": "Productionize ML models and monitoring systems.", "applications": [] },
    { "id": 30, "title": "QA Automation Engineer", "company": "Wipro", "location": "Kolkata (On-site)", "salary": "42k-58k", "description": "Build automated test frameworks and CI integration.", "applications": [] },
    { "id": 31, "title": "Mobile Engineer", "company": "Qualcomm", "location": "Gurugram (On-site)", "salary": "52k-68k", "description": "Develop native and cross-platform mobile apps.", "applications": [] },
    { "id": 32, "title": "Cloud Architect", "company": "Accenture", "location": "Chennai (On-site)", "salary": "80k-110k", "description": "Architect cloud solutions on AWS/GCP/Azure.", "applications": [] },
    { "id": 33, "title": "Data Analyst", "company": "Google", "location": "Bengaluru (On-site)", "salary": "45k-60k", "description": "Perform data analysis and build dashboards.", "applications": [] },
    { "id": 34, "title": "Security Engineer", "company": "Deloitte", "location": "Ahmedabad (On-site)", "salary": "65k-90k", "description": "Implement security controls and SOC tooling.", "applications": [] },
    { "id": 35, "title": "Systems Engineer", "company": "IBM", "location": "Pune (Remote/On-site)", "salary": "50k-70k", "description": "Manage and improve internal systems and tooling.", "applications": [] },
    { "id": 36, "title": "Network Engineer", "company": "Cisco", "location": "Hyderabad (On-site)", "salary": "48k-62k", "description": "Design and troubleshoot network infrastructure.", "applications": [] },
    { "id": 37, "title": "Database Engineer", "company": "Persistent Systems", "location": "Mumbai (On-site)", "salary": "55k-75k", "description": "Optimize database performance and backups.", "applications": [] },
    { "id": 38, "title": "Graphics Programmer", "company": "Adobe", "location": "Kolkata (On-site)", "salary": "58k-78k", "description": "Work on rendering pipelines and shader development.", "applications": [] },
    { "id": 39, "title": "Embedded Firmware Engineer", "company": "Bosch Global", "location": "Chennai (On-site)", "salary": "54k-72k", "description": "Develop firmware for embedded devices in C/C++.", "applications": [] },
    { "id": 40, "title": "Robotics Intern", "company": "Morgan Stanley", "location": "Gurugram (On-site)", "salary": "36k-50k", "description": "Prototype robotic control algorithms and simulation.", "applications": [] },
    { "id": 41, "title": "Site Reliability Engineer", "company": "TCS (Tata Consultancy Services)", "location": "Pune (Remote/On-site)", "salary": "70k-95k", "description": "Improve service reliability and incident response.", "applications": [] },
    { "id": 42, "title": "AI Engineer", "company": "Microsoft", "location": "Bengaluru (On-site)", "salary": "75k-100k", "description": "Build and deploy AI-driven features in production.", "applications": [] },
    { "id": 43, "title": "DevTools Engineer", "company": "Google", "location": "Noida (On-site)", "salary": "60k-85k", "description": "Create developer tools that boost engineering velocity.", "applications": [] },
    { "id": 44, "title": "Technical Writer Intern", "company": "Cognizant", "location": "Pune (Remote/On-site)", "salary": "26k-36k", "description": "Document APIs and developer guides.", "applications": [] },
    { "id": 45, "title": "Platform Engineer", "company": "Amazon Development Center", "location": "Hyderabad (On-site)", "salary": "68k-92k", "description": "Build internal platforms for scalable deployments.", "applications": [] },
    { "id": 46, "title": "Product Analyst Intern", "company": "HCLTech", "location": "Bengaluru (On-site)", "salary": "30k-40k", "description": "Analyze product metrics and support PMs.", "applications": [] },
    { "id": 47, "title": "Security Research Intern", "company": "Deloitte", "location": "Gurugram (On-site)", "salary": "40k-55k", "description": "Research security vulnerabilities and mitigations.", "applications": [] },
    { "id": 48, "title": "Cloud Security Engineer", "company": "Fidelity Investments", "location": "Pune (Remote/On-site)", "salary": "72k-98k", "description": "Harden cloud environments and secure deployments.", "applications": [] },
    { "id": 49, "title": "Data Platform Engineer", "company": "JP Morgan Chase", "location": "Mumbai (On-site)", "salary": "66k-88k", "description": "Build data ingestion and transformation pipelines.", "applications": [] },
    { "id": 50, "title": "Research Intern (NLP)", "company": "L&T Technology Services (LTTS)", "location": "Hyderabad (On-site)", "salary": "38k-52k", "description": "Work on natural language processing models and datasets.", "applications": [] },
    { "id": 51, "title": "Visualization Engineer", "company": "Mphasis", "location": "Pune (Remote/On-site)", "salary": "48k-64k", "description": "Build interactive visualizations and dashboards.", "applications": [] },
    { "id": 52, "title": "QA Lead (Junior)", "company": "Wipro", "location": "Gurugram (On-site)", "salary": "46k-62k", "description": "Coordinate test plans and automation efforts.", "applications": [] },
    { "id": 53, "title": "Network Security Engineer", "company": "Cisco", "location": "Bengaluru (On-site)", "salary": "68k-92k", "description": "Implement network security and IDS/IPS solutions.", "applications": [] },
    { "id": 54, "title": "Firmware Engineer", "company": "Samsung R&D", "location": "Chennai (On-site)", "salary": "60k-80k", "description": "Develop low-level firmware for IoT devices.", "applications": [] },
    { "id": 55, "title": "Systems Programmer", "company": "Mphasis", "location": "Noida (On-site)", "salary": "64k-86k", "description": "Work on systems software and performance tuning.", "applications": [] },
    { "id": 56, "title": "Cloud Ops Engineer", "company": "Capgemini", "location": "Pune (Remote/On-site)", "salary": "58k-78k", "description": "Operate cloud infrastructure and automation scripts.", "applications": [] },
    { "id": 57, "title": "Data Scientist", "company": "Goldman Sachs", "location": "Hyderabad (On-site)", "salary": "70k-95k", "description": "Develop predictive models and data-driven insights.", "applications": [] },
    { "id": 58, "title": "Full Stack Engineer", "company": "Infosys", "location": "Mumbai (On-site)", "salary": "66k-90k", "description": "Ship end-to-end features across web stack.", "applications": [] },
    { "id": 59, "title": "Mobile QA Engineer", "company": "Cognizant", "location": "Kolkata (On-site)", "salary": "44k-60k", "description": "Test mobile applications across platforms.", "applications": [] },
    { "id": 60, "title": "Platform Security Engineer", "company": "Wells Fargo India", "location": "Pune (Remote/On-site)", "salary": "72k-100k", "description": "Secure the platform and implement best practices.", "applications": [] },
    { "id": 61, "title": "AI Ops Engineer", "company": "L&T Infotech (LTI)", "location": "Chennai (On-site)", "salary": "62k-85k", "description": "Operate ML systems and monitoring pipelines.", "applications": [] },
    { "id": 62, "title": "Game Engine Intern", "company": "Microsoft India", "location": "Noida (On-site)", "salary": "36k-50k", "description": "Help develop game engine features and tools.", "applications": [] },
    { "id": 63, "title": "Cloud Developer", "company": "Tech Mahindra", "location": "Gurugram (On-site)", "salary": "58k-80k", "description": "Build cloud-native services and APIs.", "applications": [] },
    { "id": 64, "title": "Security Automation Engineer", "company": "Honeywell", "location": "Pune (Remote/On-site)", "salary": "68k-92k", "description": "Automate security scans and incident response.", "applications": [] },
    { "id": 65, "title": "Big Data Engineer", "company": "TCS (Tata Consultancy Services)", "location": "Bengaluru (On-site)", "salary": "70k-98k", "description": "Design and maintain large-scale data systems.", "applications": [] },
    { "id": 66, "title": "Computer Vision Intern", "company": "Amazon", "location": "Hyderabad (On-site)", "salary": "38k-54k", "description": "Work on image/video models and pipelines.", "applications": [] },
    { "id": 67, "title": "Embedded Software Intern", "company": "Siemens", "location": "Kolkata (On-site)", "salary": "34k-46k", "description": "Develop embedded features and drivers.", "applications": [] },
    { "id": 68, "title": "Release Engineer", "company": "IBM", "location": "Pune (Remote/On-site)", "salary": "60k-82k", "description": "Manage release processes and CI tooling.", "applications": [] },
    { "id": 69, "title": "Monitoring Engineer", "company": "Accenture", "location": "Chennai (On-site)", "salary": "56k-76k", "description": "Build systems for observability and alerts.", "applications": [] },
    { "id": 70, "title": "IT Support Engineer", "company": "Infosys", "location": "Mumbai (On-site)", "salary": "38k-50k", "description": "Provide IT support and incident triage.", "applications": [] },
    { "id": 71, "title": "Cloud Cost Engineer", "company": "Oracle India", "location": "Pune (Remote/On-site)", "salary": "64k-86k", "description": "Analyze cloud spend and optimize costs.", "applications": [] },
    { "id": 72, "title": "AI Researcher", "company": "Capgemini", "location": "Gurugram (On-site)", "salary": "85k-120k", "description": "Conduct advanced research and publishable work.", "applications": [] },
    { "id": 73, "title": "SRE (Junior)", "company": "Google", "location": "Bengaluru (On-site)", "salary": "60k-82k", "description": "Support site reliability and incident management.", "applications": [] },
    { "id": 74, "title": "Database Administrator", "company": "JP Morgan Chase", "location": "Hyderabad (On-site)", "salary": "62k-84k", "description": "Manage DB clusters and backups at scale.", "applications": [] },
    { "id": 75, "title": "Network Ops", "company": "Qualcomm", "location": "Ahmedabad (On-site)", "salary": "54k-70k", "description": "Operate network infrastructure and optimize latency.", "applications": [] },
    { "id": 76, "title": "Embedded QA", "company": "Bosch Global", "location": "Chennai (On-site)", "salary": "40k-54k", "description": "Test embedded systems and hardware integrations.", "applications": [] },
    { "id": 77, "title": "Robotics Software Engineer", "company": "Morgan Stanley", "location": "Gurugram (On-site)", "salary": "72k-98k", "description": "Develop perception and control software for robots.", "applications": [] },
    { "id": 78, "title": "Cloud Native Developer", "company": "Fidelity Investments", "location": "Pune (Remote/On-site)", "salary": "66k-90k", "description": "Build microservices and cloud-native architectures.", "applications": [] },
    { "id": 79, "title": "Platform Reliability Engineer", "company": "Persistent Systems", "location": "Mumbai (On-site)", "salary": "68k-92k", "description": "Ensure platform stability and resilience.", "applications": [] },
    { "id": 80, "title": "Firmware QA", "company": "Amazon", "location": "Kolkata (On-site)", "salary": "42k-56k", "description": "Test firmware releases and hardware interactions.", "applications": [] },
    { "id": 81, "title": "Geospatial Engineer", "company": "Honeywell", "location": "Pune (Remote/On-site)", "salary": "58k-78k", "description": "Work with mapping data and geospatial pipelines.", "applications": [] },
    { "id": 82, "title": "Backend Java Engineer", "company": "HCLTech", "location": "Bengaluru (On-site)", "salary": "68k-95k", "description": "Build backend services in Java/Kotlin.", "applications": [] },
    { "id": 83, "title": "Platform Data Engineer", "company": "Goldman Sachs", "location": "Hyderabad (On-site)", "salary": "70k-96k", "description": "Build data platforms and streaming pipelines.", "applications": [] },
    { "id": 84, "title": "Hardware Engineer Intern", "company": "Bosch Global", "location": "Chennai (On-site)", "salary": "36k-50k", "description": "Assist hardware bring-up and testing.", "applications": [] },
    { "id": 85, "title": "Performance Engineer", "company": "Qualcomm", "location": "Gurugram (On-site)", "salary": "72k-100k", "description": "Profile and optimize system performance.", "applications": [] },
    { "id": 86, "title": "Edge Computing Engineer", "company": "Google", "location": "Pune (Remote/On-site)", "salary": "64k-88k", "description": "Develop edge-native services and deployments.", "applications": [] },
    { "id": 87, "title": "Kubernetes Engineer", "company": "Cognizant", "location": "Noida (On-site)", "salary": "66k-92k", "description": "Operate and secure K8s clusters at scale.", "applications": [] },
    { "id": 88, "title": "Observability Engineer", "company": "TCS (Tata Consultancy Services)", "location": "Bengaluru (On-site)", "salary": "60k-85k", "description": "Create observability platforms and dashboards.", "applications": [] },
    { "id": 89, "title": "NLP Engineer", "company": "Adobe", "location": "Pune (Remote/On-site)", "salary": "70k-98k", "description": "Work on language models and text pipelines.", "applications": [] },
    { "id": 90, "title": "Platform Test Engineer", "company": "JP Morgan Chase", "location": "Hyderabad (On-site)", "salary": "52k-70k", "description": "Design tests for large distributed systems.", "applications": [] },
    { "id": 91, "title": "Frontend Accessibility Engineer", "company": "Microsoft India", "location": "Gurugram (On-site)", "salary": "62k-84k", "description": "Improve web accessibility and component library.", "applications": [] },
    { "id": 92, "title": "Cloud Migration Engineer", "company": "L&T Infotech (LTI)", "location": "Pune (Remote/On-site)", "salary": "72k-98k", "description": "Help migrate legacy workloads to the cloud.", "applications": [] },
    { "id": 93, "title": "Site Reliability Intern", "company": "Wipro", "location": "Chennai (On-site)", "salary": "36k-50k", "description": "Support on-call rotations and incident drills.", "applications": [] },
    { "id": 94, "title": "Systems Security Engineer", "company": "Deloitte", "location": "Ahmedabad (On-site)", "salary": "74k-102k", "description": "Harden systems against attack vectors and exploits.", "applications": [] },
    { "id": 95, "title": "IoT Developer", "company": "Honeywell", "location": "Pune (Remote/On-site)", "salary": "58k-80k", "description": "Build IoT solutions and device integrations.", "applications": [] },
    { "id": 96, "title": "Platform Engineer Intern", "company": "Infosys", "location": "Mumbai (On-site)", "salary": "34k-46k", "description": "Assist platform team with automation and scripts.", "applications": [] },
    { "id": 97, "title": "Hardware Validation Engineer", "company": "Microsoft", "location": "Kolkata (On-site)", "salary": "56k-76k", "description": "Validate hardware designs and run test benches.", "applications": [] },
    { "id": 98, "title": "AI Engineer", "company": "Microsoft", "location": "Pune (Remote/On-site)", "salary": "64k-86k", "description": "Automate network configuration and management.", "applications": [] },
    { "id": 99, "title": "Research Intern (Computer Graphics)", "company": "Adobe", "location": "Gurugram (On-site)", "salary": "38k-52k", "description": "Work on rendering research and prototypes.", "applications": [] },
    { "id": 100, "title": "Junior Software Engineer", "company": "Accenture", "location": "Bengaluru (On-site)", "salary": "48k-68k", "description": "Contribute to backend services and API development.", "applications": [] },
    { "id": 101, "title": "Senior Frontend Developer", "company": "HCLTech", "location": "Pune (Remote/On-site)", "salary": "80k-110k", "description": "Lead development of complex, high-performance UIs using React/Vue and state management.", "applications": [] },
    { "id": 102, "title": "Senior Backend Engineer (Go/Rust)", "company": "TCS (Tata Consultancy Services)", "location": "Bengaluru (On-site)", "salary": "95k-130k", "description": "Design and implement scalable backend systems in Go or Rust.", "applications": [] },
    { "id": 103, "title": "Data Scientist (Computer Vision)", "company": "Infosys", "location": "Hyderabad (On-site)", "salary": "85k-115k", "description": "Develop and deploy Computer Vision models for object detection and image analysis.", "applications": [] },
    { "id": 104, "title": "Cloud Security Architect", "company": "Wipro", "location": "Gurugram (On-site)", "salary": "100k-140k", "description": "Define and enforce security standards across multi-cloud environments (AWS/Azure).", "applications": [] },
    { "id": 105, "title": "Full Stack Engineer (Node/React)", "company": "Tech Mahindra", "location": "Chennai (On-site)", "salary": "65k-90k", "description": "Deliver end-to-end features for enterprise applications.", "applications": [] },
    { "id": 106, "title": "Embedded Linux Developer", "company": "Bosch Global", "location": "Noida (On-site)", "salary": "60k-82k", "description": "Work on kernel development and custom Linux distributions for embedded devices.", "applications": [] },
    { "id": 107, "title": "UI/UX Designer (Mid-Level)", "company": "Capgemini", "location": "Pune (Remote/On-site)", "salary": "40k-55k", "description": "Create wireframes, prototypes, and final designs for mobile and web products.", "applications": [] },
    { "id": 108, "title": "DevOps Engineer (Azure)", "company": "Persistent Systems", "location": "Mumbai (On-site)", "salary": "75k-100k", "description": "Focus on Azure DevOps, CI/CD, and resource management.", "applications": [] },
    { "id": 109, "title": "Technical Product Manager", "company": "Google ", "location": "Bengaluru (On-site)", "salary": "90k-125k", "description": "Bridge technical capabilities with business goals, managing the product lifecycle.", "applications": [] },
    { "id": 110, "title": "SRE (Kubernetes/GCP)", "company": "Amazon Development Center", "location": "Hyderabad (On-site)", "salary": "85k-110k", "description": "Manage container orchestration and infrastructure reliability on Google Cloud Platform.", "applications": [] },
    { "id": 111, "title": "Mobile Developer (Flutter)", "company": "Cognizant", "location": "Kolkata (On-site)", "salary": "55k-75k", "description": "Develop high-quality cross-platform mobile applications using Flutter.", "applications": [] },
    { "id": 112, "title": "Data Engineer (Spark/Kafka)", "company": "Amazon", "location": "Pune (Remote/On-site)", "salary": "78k-105k", "description": "Build real-time data pipelines using Apache Spark and Kafka.", "applications": [] },
    { "id": 113, "title": "IT Auditor (Security Focus)", "company": "Amazon", "location": "Ahmedabad (On-site)", "salary": "60k-85k", "description": "Conduct IT audits, ensuring compliance with security standards (ISO, SOC 2).", "applications": [] },
    { "id": 114, "title": "Cloud Platform Engineer", "company": "Capgemini", "location": "Gurugram (On-site)", "salary": "70k-95k", "description": "Develop and maintain the internal developer platform using cloud services.", "applications": [] },
    { "id": 115, "title": "Quality Assurance Analyst (Manual)", "company": "Mphasis", "location": "Mumbai (On-site)", "salary": "35k-48k", "description": "Execute manual test cases, track defects, and verify fixes.", "applications": [] },
    { "id": 116, "title": "Machine Learning Engineer (Production)", "company": "Microsoft", "location": "Bengaluru (On-site)", "salary": "90k-120k", "description": "Move ML models from research to production environments, focusing on MLOps.", "applications": [] },
    { "id": 117, "title": "Technical Writer (Advanced)", "company": "IBM", "location": "Pune (Remote/On-site)", "salary": "50k-70k", "description": "Create detailed technical specifications, white papers, and SDK documentation.", "applications": [] },
    { "id": 118, "title": "Network Administrator", "company": "Microsoft", "location": "Chennai (On-site)", "salary": "42k-58k", "description": "Maintain and troubleshoot local and wide area network infrastructure.", "applications": [] },
    { "id": 119, "title": "AI Research Scientist (PhD preferred)", "company": "Samsung R&D", "location": "Hyderabad (On-site)", "salary": "110k-160k", "description": "Lead exploratory research in next-generation AI and machine learning techniques.", "applications": [] },
    { "id": 120, "title": "Data Visualization Expert", "company": "Adobe", "location": "Gurugram (On-site)", "salary": "70k-95k", "description": "Build compelling data stories and interactive dashboards using Tableau/PowerBI.", "applications": [] },
    { "id": 121, "title": "Blockchain Developer (Solidity)", "company": "TCS (Tata Consultancy Services)", "location": "Bengaluru (On-site)", "salary": "85k-115k", "description": "Develop and audit smart contracts and decentralized applications (DApps).", "applications": [] },
    { "id": 122, "title": "ERP Systems Analyst", "company": "Microsoft", "location": "Mumbai (On-site)", "salary": "60k-80k", "description": "Analyze business processes and configure ERP (SAP/Oracle) modules.", "applications": [] },
    { "id": 123, "title": "Security Operations Center (SOC) Analyst", "company": "Fidelity Investments", "location": "Ahmedabad (On-site)", "salary": "50k-70k", "description": "Monitor security alerts, investigate incidents, and perform threat analysis.", "applications": [] },
    { "id": 124, "title": "Junior Game Developer (Unity)", "company": "Microsoft India", "location": "Noida (On-site)", "salary": "40k-55k", "description": "Assist in building game logic and features in the Unity engine.", "applications": [] },
    { "id": 125, "title": "Database Developer (SQL/NoSQL)", "company": "Wells Fargo India", "location": "Pune (Remote/On-site)", "salary": "60k-85k", "description": "Design, implement, and optimize database schemas and stored procedures.", "applications": [] },
    { "id": 126, "title": "AI Ops Specialist", "company": "L&T Infotech (LTI)", "location": "Chennai (On-site)", "salary": "75k-100k", "description": "Automate IT operations using machine learning and predictive analytics.", "applications": [] },
    { "id": 127, "title": "IT Support Technician (Tier 2)", "company": "Mphasis", "location": "Kolkata (On-site)", "salary": "45k-60k", "description": "Provide advanced technical support and resolution for hardware/software issues.", "applications": [] },
    { "id": 128, "title": "Product Analyst (Growth)", "company": "Morgan Stanley", "location": "Bengaluru (On-site)", "salary": "50k-70k", "description": "Analyze growth funnels, user behavior, and A/B test results to drive product strategy.", "applications": [] },
    { "id": 129, "title": "Senior Systems Engineer (Linux)", "company": "Honeywell", "location": "Pune (Remote/On-site)", "salary": "85k-115k", "description": "Manage and scale large Linux environments and virtual infrastructure.", "applications": [] },
    { "id": 130, "title": "Network Security Analyst", "company": "JP Morgan Chase", "location": "Hyderabad (On-site)", "salary": "68k-92k", "description": "Monitor network traffic for security threats and implement mitigation strategies.", "applications": [] },
    { "id": 131, "title": "Software Engineer", "company": "Meta", "location": "Remote", "salary": "75k-95k", "description": "Build scalable social media platforms and features.", "applications": [] },
    { "id": 132, "title": "React Developer", "company": "Meta", "location": "Mumbai (On-site)", "salary": "60k-80k", "description": "Create engaging user interfaces using React and GraphQL.", "applications": [] },
    { "id": 133, "title": "iOS Developer", "company": "Apple", "location": "Bengaluru (On-site)", "salary": "70k-90k", "description": "Develop innovative iOS applications for Apple devices.", "applications": [] },
    { "id": 134, "title": "Machine Learning Engineer", "company": "Apple", "location": "Remote", "salary": "90k-120k", "description": "Build AI-powered features for Apple products.", "applications": [] },
    { "id": 135, "title": "Cloud Architect", "company": "IBM", "location": "Pune (Remote/On-site)", "salary": "85k-110k", "description": "Design and implement enterprise cloud solutions.", "applications": [] },
    { "id": 136, "title": "Cloud Engg.", "company": "Google", "location": "Pune (Remote)", "salary": "85k-110k", "description": "Design and implement enterprise cloud solutions.", "applications": [] },
    { "id": 137, "title": "Data Engineer", "company": "IBM", "location": "Hyderabad (On-site)", "salary": "65k-85k", "description": "Build and maintain data pipelines and warehouses.", "applications": [] }
];

function generateJobTable(data) {
    const container = document.getElementById('jobTableContainer');
    if (!container) return; // Exit if container not found

    const table = document.createElement('table');
    table.classList.add('job-table'); // Use a CSS class for styling

    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    
    // Create Header Row
    const headers = ["ID", "Title", "Company", "Location", "Salary", "Description", "Logo"];
    let headerRow = document.createElement('tr');
    headers.forEach(headerText => {
        let th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    
    // Create Data Rows
    data.forEach(job => {
        let row = document.createElement('tr');
        
        // Define the properties to display in order
        const keys = ["id", "title", "company", "location", "salary", "description"];
        
        keys.forEach(key => {
            let td = document.createElement('td');
            td.textContent = job[key];
            row.appendChild(td);
        });
        
        // Add the Logo column (Placeholder/Image Tag)
        let logoTd = document.createElement('td');
        logoTd.textContent = `[Logo of ${job.company}]`; // You can replace this with an actual <img> tag later
        row.appendChild(logoTd);
        
        tbody.appendChild(row);
    });
    
    table.appendChild(thead);
    table.appendChild(tbody);
    container.appendChild(table);
}

// C. Call the function once the entire page (DOM) is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (typeof jobData !== 'undefined') {
        generateJobTable(jobData);
    } else if (typeof jobs !== 'undefined') {
        generateJobTable(jobs);
    }
});

let profiles = {
    jobseekers: {
        'seeker@example.com': {
            name: 'Job seeker',
            resume: 'path/to/alex_resume.pdf',
            skills: ['HTML', 'CSS', 'JavaScript', 'React'],
            applications: [1, 5] // job IDs
        }
    },
    employers: {
        'employer@example.com': {
            companyName: 'TechNova',
            postedJobs: [1] // job IDs
        }
    }
};

let companyProfiles = {
    'TechNova': { name: 'TechNova', description: 'A leading innovator in cloud solutions and AI.', website: 'technova.example.com', jobs: [1] },
    'ByteWorks': { name: 'ByteWorks', description: 'Pioneering the future of backend services.', website: 'byteworks.example.com', jobs: [2] },
    'DataPulse': { name: 'DataPulse', description: 'We make data insightful and actionable.', website: 'datapulse.example.com', jobs: [3] }
};


// --- 5. Application Tracking (Simulated) ---

function applyForJob(jobId) {
    console.log('🚀 Applying to job:', jobId);
    
    // Ensure authentication
    if (localStorage.getItem('isAuthenticated') !== 'true') {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userRole', 'jobseeker');
        localStorage.setItem('userName', 'Demo User');
        localStorage.setItem('userEmail', 'demo@example.com');
    }
    
    // Save jobs data
    if (typeof jobs !== 'undefined' && jobs.length > 0) {
        localStorage.setItem('currentJobs', JSON.stringify(jobs));
    }
    
    window.location.href = 'apply.html?jobId=' + jobId;
}


// --- Dashboard Rendering ---

function loadDashboard() {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const userRole = localStorage.getItem('userRole');
    const username = localStorage.getItem('userName');
    const container = document.getElementById('dashboard-content');

    if (!container) return;

    if (!isAuthenticated) {
        container.innerHTML = '<p>Please login to view your dashboard.</p>';
        return;
    }

    if (userRole === 'jobseeker') {
        renderJobSeekerDashboard(username, container);
    } else if (userRole === 'employer') {
        renderEmployerDashboard(username, container);
    } else {
        container.innerHTML = '<p>Invalid user role.</p>';
    }
}

async function renderJobSeekerDashboard(username, container) {
    container.innerHTML = '<p>Loading...</p>';
    
    const applicationCount = getApplicationCount();
    const savedJobIds = JSON.parse(localStorage.getItem('savedJobs') || '[]');
    const savedJobs = savedJobIds;
    const resumeUploaded = localStorage.getItem('userResume') ? true : false;
    const userPhoto = localStorage.getItem('userPhoto');
    const loginProvider = localStorage.getItem('loginProvider');
    
    let html = `
        <div class="dashboard-view">
            <div style="display:flex;align-items:center;gap:15px;margin-bottom:20px;padding:20px;background:white;border-radius:12px;box-shadow:0 2px 8px rgba(0,0,0,0.1)">
                ${userPhoto ? `<img src="${userPhoto}" alt="Profile" style="width:70px;height:70px;border-radius:50%;object-fit:cover;border:3px solid #0ea5a4;box-shadow:0 2px 8px rgba(14,165,164,0.2)">` : '<div style="width:70px;height:70px;border-radius:50%;background:linear-gradient(135deg, #0ea5a4, #0b7b76);display:flex;align-items:center;justify-content:center;font-size:28px;color:white;box-shadow:0 2px 8px rgba(0,0,0,0.15)">👤</div>'}
                <div style="flex:1">
                    <h4 style="margin:0 0 4px 0;color:#1a202c">${username}</h4>
                    ${loginProvider ? `<small style="color:#718096;font-size:13px">✓ Logged in via ${loginProvider.charAt(0).toUpperCase() + loginProvider.slice(1)}</small>` : '<small style="color:#718096;font-size:13px">Job Seeker Account</small>'}
                </div>
            </div>
            <div class="dashboard-section" style="display:flex;flex-direction:column;gap:10px">
                <button class="btn-primary" onclick="showJobSearchInDashboard()" style="width:100%">🔍 Search Jobs</button>
                <button class="btn-secondary" onclick="showSavedJobs()" style="width:100%">🤍 Saved Jobs (${savedJobs.length})</button>
                <button class="btn-secondary" onclick="showMyApplications()" style="width:100%">📋 My Applications (${applicationCount})</button>
                <button class="btn-secondary" onclick="showUploadResume()" style="width:100%;background:${resumeUploaded ? '#10b981' : '#3b82f6'}">${resumeUploaded ? '✓ Resume Uploaded' : '📄 Upload Resume'}</button>
                <button class="btn-secondary" onclick="showChangeProfilePhoto()" style="width:100%;background:#8b5cf6">📸 Change Profile Photo</button>
                <button class="btn-secondary" onclick="logoutUser()" style="width:100%;background:#ef4444">🚪 Logout</button>
            </div>
            <div class="dashboard-section">
                <h5>Quick Stats</h5>
                <div class="stats-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin:12px 0">
                    <div class="stat-card" style="background:rgba(14,165,164,0.1);padding:16px;border-radius:8px;text-align:center">
                        <span class="stat-number" style="display:block;font-size:24px;font-weight:700;color:var(--accent)">${applicationCount}</span>
                        <span class="stat-label" style="font-size:13px;color:var(--muted)">Applications</span>
                    </div>
                    <div class="stat-card" style="background:rgba(239,68,68,0.1);padding:16px;border-radius:8px;text-align:center">
                        <span class="stat-number" style="display:block;font-size:24px;font-weight:700;color:#ef4444">${savedJobs.length}</span>
                        <span class="stat-label" style="font-size:13px;color:var(--muted)">Saved Jobs</span>
                    </div>
                </div>
            </div>
            <div class="dashboard-section">
                <h5>Recent Activity</h5>
                ${getRecentApplications()}
            </div>
        </div>
    `;
    container.innerHTML = html;
}

async function renderEmployerDashboard(username, container) {
    // Load from localStorage first
    const localJobs = getEmployerJobs();
    const totalApplications = localJobs.reduce((sum, job) => sum + (job.applications?.length || 0), 0);
    
    // Render UI immediately with local data
    renderEmployerUI(username, container, localJobs, totalApplications);
    
    // Then try to load from backend
    try {
        const response = await jobAPI.getMyJobs();
        const loadedJobs = response.jobs || [];
        
        // Merge with local jobs
        const allJobs = [...localJobs];
        loadedJobs.forEach(job => {
            if (!allJobs.find(j => j._id === job._id)) {
                allJobs.push(job);
            }
        });
        
        const loadedApps = allJobs.reduce((sum, job) => sum + (job.applications?.length || 0), 0);
        renderEmployerUI(username, container, allJobs, loadedApps);
    } catch (error) {
        // Keep showing local data if API fails
        console.log('Using local jobs data');
    }
}

function renderEmployerUI(username, container, myJobs, totalApplications) {
        const userPhoto = localStorage.getItem('userPhoto');
        const loginProvider = localStorage.getItem('loginProvider');
        
        let html = `
            <div class="dashboard-view">
                <div style="display:flex;align-items:center;gap:15px;margin-bottom:20px;padding:20px;background:white;border-radius:12px;box-shadow:0 2px 8px rgba(0,0,0,0.1)">
                    ${userPhoto ? `<img src="${userPhoto}" alt="Profile" style="width:70px;height:70px;border-radius:50%;object-fit:cover;border:3px solid #0ea5a4;box-shadow:0 2px 8px rgba(14,165,164,0.2)">` : '<div style="width:70px;height:70px;border-radius:50%;background:linear-gradient(135deg, #0ea5a4, #0b7b76);display:flex;align-items:center;justify-content:center;font-size:28px;color:white;box-shadow:0 2px 8px rgba(0,0,0,0.15)">🏢</div>'}
                    <div style="flex:1">
                        <h4 style="margin:0 0 4px 0;color:#1a202c">${username}</h4>
                        ${loginProvider ? `<small style="color:#718096;font-size:13px">✓ Logged in via ${loginProvider.charAt(0).toUpperCase() + loginProvider.slice(1)}</small>` : '<small style="color:#718096;font-size:13px">Employer Account</small>'}
                    </div>
                </div>
                <div class="dashboard-section" style="display:flex;flex-direction:column;gap:10px">
                    <button class="btn-primary" onclick="showPostJobForm()" style="width:100%">+ Post a New Job</button>
                    <button class="btn-secondary" onclick="showManageJobs()" style="width:100%">📋 Manage Jobs</button>
                    <button class="btn-secondary" onclick="showAllApplicants()" style="width:100%">👥 All Applicants</button>
                    <button class="btn-secondary" onclick="showJobAnalytics()" style="width:100%;background:#8b5cf6">📊 Job Analytics</button>
                    <button class="btn-secondary" onclick="showCompanyProfile()" style="width:100%">🏢 Company Profile</button>
                    <button class="btn-secondary" onclick="showChangeProfilePhoto()" style="width:100%;background:#8b5cf6">📸 Change Profile Photo</button>
                    <button class="btn-secondary" onclick="logoutUser()" style="width:100%;background:#ef4444">🚪 Logout</button>
                </div>
                <div class="dashboard-section">
                    <h5>Quick Stats</h5>
                    <div class="stats-grid" style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px;margin:12px 0">
                        <div class="stat-card" style="background:rgba(14,165,164,0.1);padding:16px;border-radius:8px;text-align:center">
                            <span class="stat-number" style="display:block;font-size:24px;font-weight:700;color:var(--accent)">${myJobs.length}</span>
                            <span class="stat-label" style="font-size:13px;color:var(--muted)">Active Jobs</span>
                        </div>
                        <div class="stat-card" style="background:rgba(59,130,246,0.1);padding:16px;border-radius:8px;text-align:center">
                            <span class="stat-number" style="display:block;font-size:24px;font-weight:700;color:#3b82f6">${totalApplications}</span>
                            <span class="stat-label" style="font-size:13px;color:var(--muted)">Total Applications</span>
                        </div>
                        <div class="stat-card" style="background:rgba(34,197,94,0.1);padding:16px;border-radius:8px;text-align:center">
                            <span class="stat-number" style="display:block;font-size:24px;font-weight:700;color:#22c55e">${myJobs.filter(j => j.applications?.length > 0).length}</span>
                            <span class="stat-label" style="font-size:13px;color:var(--muted)">Jobs with Applications</span>
                        </div>
                    </div>
                </div>

            </div>
        `;
        container.innerHTML = html;
}

function showPostJobForm() {
    const container = document.getElementById('dashboard-content');
    container.innerHTML = `
        <h3>Post New Job</h3>
        <form onsubmit="event.preventDefault(); saveNewJob()">
            <div class="form-group"><label>Job Title:</label><input id="job-title" required></div>
            <div class="form-group"><label>Company:</label><input id="job-company" required></div>
            <div class="form-group"><label>Location:</label><input id="job-location" required></div>
            <div class="form-group"><label>Salary Range:</label><input id="job-salary" placeholder="e.g., 50k-70k" required></div>
            <div class="form-group"><label>Description:</label><textarea id="job-desc" required></textarea></div>
            <div class="form-group"><label>Qualifications:</label><textarea id="job-qual"></textarea></div>
            <div class="form-group"><label>Responsibilities:</label><textarea id="job-resp"></textarea></div>
            <div class="form-group">
                <button type="submit" class="btn-primary">Create Job</button>
                <button type="button" class="btn-secondary" onclick="loadDashboard()">Cancel</button>
            </div>
        </form>
    `;
}

async function saveNewJob() {
    const jobData = {
        title: document.getElementById('job-title').value,
        company: document.getElementById('job-company').value,
        location: document.getElementById('job-location').value,
        salary: document.getElementById('job-salary').value,
        description: document.getElementById('job-desc').value,
        qualifications: document.getElementById('job-qual').value,
        responsibilities: document.getElementById('job-resp').value
    };

    try {
        const response = await jobAPI.create(jobData);
        if (response.success) {
            // Add to global jobs array immediately
            const newJob = {
                id: Date.now(), // Unique ID
                _id: response.job?._id || Date.now().toString(),
                title: jobData.title,
                company: jobData.company,
                location: jobData.location,
                salary: jobData.salary,
                description: jobData.description,
                qualifications: jobData.qualifications || '',
                responsibilities: jobData.responsibilities || '',
                applications: [],
                postedBy: localStorage.getItem('userName'),
                postedDate: new Date().toISOString(),
                createdAt: new Date().toISOString()
            };
            
            jobs.push(newJob);
            
            // Save to localStorage
            let employerJobs = JSON.parse(localStorage.getItem('employerJobs') || '[]');
            employerJobs.push(newJob);
            localStorage.setItem('employerJobs', JSON.stringify(employerJobs));
            
            showToast('Job posted successfully!', {type:'success'});
            loadDashboard();
        }
    } catch (error) {
        console.log('Backend error, using fallback:', error);
        // Fallback: Add to local jobs array even if backend fails
        const newJob = {
            id: Date.now(), // Unique ID
            _id: Date.now().toString(),
            title: jobData.title,
            company: jobData.company,
            location: jobData.location,
            salary: jobData.salary,
            description: jobData.description,
            qualifications: jobData.qualifications || '',
            responsibilities: jobData.responsibilities || '',
            applications: [],
            postedBy: localStorage.getItem('userName'),
            postedDate: new Date().toISOString(),
            createdAt: new Date().toISOString()
        };
        
        // Add to global jobs array
        jobs.push(newJob);
        
        // Save to localStorage
        let employerJobs = JSON.parse(localStorage.getItem('employerJobs') || '[]');
        employerJobs.push(newJob);
        localStorage.setItem('employerJobs', JSON.stringify(employerJobs));
        
        showToast('Job posted successfully!', {type:'success'});
        loadDashboard();
    }
}

// Get employer's posted jobs
function getEmployerJobs() {
    const stored = localStorage.getItem('employerJobs');
    const employerJobs = stored ? JSON.parse(stored) : [];
    
    // Filter by current employer
    const currentEmployer = localStorage.getItem('userName');
    return employerJobs.filter(job => job.postedBy === currentEmployer);
}

async function showManageJobs() {
    const container = document.getElementById('dashboard-content');
    
    // Load from localStorage first
    const localJobs = getEmployerJobs();
    renderManageJobsUI(container, localJobs);
    
    // Load data from backend
    try {
        const response = await jobAPI.getMyJobs();
        const backendJobs = response.jobs || [];
        
        // Merge with local jobs
        const allJobs = [...localJobs];
        backendJobs.forEach(job => {
            if (!allJobs.find(j => j._id === job._id)) {
                allJobs.push(job);
            }
        });
        
        renderManageJobsUI(container, allJobs);
    } catch (error) {
        // Keep showing local jobs
        console.log('Using local jobs for manage section');
    }
}

function renderManageJobsUI(container, myJobs) {
        
        container.innerHTML = `
            <div class="dashboard-view">
                <h3>Manage Your Jobs (${myJobs.length})</h3>
                <button class="btn-secondary" onclick="loadDashboard()" style="margin-bottom:20px">← Back to Dashboard</button>
                ${myJobs.length === 0 ? 
                    '<p style="color: var(--muted); font-style: italic;">No jobs posted yet. <a href="#" onclick="showPostJobForm()" style="color: var(--accent);">Post your first job!</a></p>' :
                    myJobs.map(job => `
                        <div class="job-card">
                            <h3>${job.title}</h3>
                            <p><strong>${job.company}</strong> • ${job.location} • ${job.salary}</p>
                            <p class="job-desc">${job.description.substring(0, 150)}...</p>
                            <div style="margin-top:12px;padding:12px;background:rgba(14,165,164,0.05);border-radius:8px">
                                <small style="color: var(--muted);">Posted: ${formatDate(job.createdAt)} • Applications: ${job.applications?.length || 0}</small>
                            </div>
                            <div class="job-actions" style="margin-top:12px">
                                <button class="btn-secondary" onclick="viewApplicants('${job._id}')">👥 View Applicants</button>
                                <button class="btn-secondary" onclick="editJobPosting('${job._id}')">✏️ Edit</button>
                                <button class="btn-secondary" onclick="deleteJobPosting('${job._id}')" style="background:#ef4444;color:white">🗑️ Delete</button>
                            </div>
                        </div>
                    `).join('')
                }
            </div>
        `;
}

async function viewApplicants(jobId) {
    const container = document.getElementById('dashboard-content');
    container.innerHTML = '<div style="text-align:center;padding:40px"><div class="loading-spinner"></div><p>Loading applicants...</p></div>';
    
    try {
        const response = await applicationAPI.getJobApplications(jobId);
        const applications = response.applications || [];
        
        // Get job details
        const jobResponse = await jobAPI.getMyJobs();
        const job = jobResponse.jobs.find(j => j._id === jobId);
        const jobTitle = job ? job.title : 'Job';
        
        container.innerHTML = `
            <div class="dashboard-view">
                <h3>Applicants for ${jobTitle} (${applications.length})</h3>
                <button class="btn-secondary" onclick="loadDashboard()" style="margin-bottom:20px">← Back to Dashboard</button>
                ${applications.length === 0 ? 
                    '<p style="color: var(--muted); font-style: italic;">No applications received yet for this position.</p>' :
                    applications.map(app => `
                        <div class="job-card">
                            <div style="display:flex;justify-content:space-between;align-items:start">
                                <div>
                                    <h4 style="margin:0 0 8px 0">${app.jobseeker.name}</h4>
                                    <p style="margin:4px 0;color:var(--muted)">📧 ${app.jobseeker.email}</p>
                                    <p style="margin:4px 0;color:var(--muted)">📅 Applied: ${formatDate(app.appliedAt)}</p>
                                    ${app.coverLetter ? `<p style="margin:8px 0 0 0;padding:12px;background:rgba(14,165,164,0.05);border-radius:8px;font-size:14px"><strong>Cover Letter:</strong><br>${app.coverLetter.substring(0, 200)}${app.coverLetter.length > 200 ? '...' : ''}</p>` : ''}
                                </div>
                                <span class="app-status" style="padding:6px 16px;border-radius:20px;font-size:13px;background:${app.status === 'pending' ? 'rgba(234,179,8,0.1)' : app.status === 'accepted' ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)'};color:${app.status === 'pending' ? '#eab308' : app.status === 'accepted' ? '#22c55e' : '#ef4444'}">${app.status || 'Pending'}</span>
                            </div>
                            <div class="job-actions" style="margin-top:16px;display:flex;gap:8px">
                                <button class="btn-secondary" onclick="updateApplicationStatus('${app._id}', 'accepted')" style="background:#22c55e;color:white">✓ Accept</button>
                                <button class="btn-secondary" onclick="updateApplicationStatus('${app._id}', 'rejected')" style="background:#ef4444;color:white">✕ Reject</button>
                                <button class="btn-secondary" onclick="contactApplicant('${app.jobseeker.email}')">📧 Contact</button>
                            </div>
                        </div>
                    `).join('')
                }
            </div>
        `;
    } catch (error) {
        container.innerHTML = '<p>Error loading applicants.</p><button class="btn-primary" onclick="loadDashboard()">Back</button>';
    }
}

async function showAllApplicants() {
    const container = document.getElementById('dashboard-content');
    container.innerHTML = '<div style="text-align:center;padding:40px"><div class="loading-spinner"></div><p>Loading applicants...</p></div>';
    
    try {
        const response = await jobAPI.getMyJobs();
        const myJobs = response.jobs || [];
        
        let allApplications = [];
        for (const job of myJobs) {
            if (job.applications && job.applications.length > 0) {
                const appResponse = await applicationAPI.getJobApplications(job._id);
                const apps = appResponse.applications || [];
                apps.forEach(app => {
                    allApplications.push({
                        ...app,
                        jobTitle: job.title,
                        jobId: job._id
                    });
                });
            }
        }
        
        container.innerHTML = `
            <div class="dashboard-view">
                <h3>All Applicants (${allApplications.length})</h3>
                <button class="btn-secondary" onclick="loadDashboard()" style="margin-bottom:20px">← Back to Dashboard</button>
                ${allApplications.length === 0 ? 
                    '<p style="color: var(--muted); font-style: italic;">No applications received yet across all your job postings.</p>' :
                    allApplications.map(app => `
                        <div class="job-card">
                            <div style="display:flex;justify-content:space-between;align-items:start">
                                <div>
                                    <h4 style="margin:0 0 4px 0">${app.jobseeker.name}</h4>
                                    <p style="margin:4px 0;color:var(--accent);font-weight:600">💼 Applied for: ${app.jobTitle}</p>
                                    <p style="margin:4px 0;color:var(--muted)">📧 ${app.jobseeker.email}</p>
                                    <p style="margin:4px 0;color:var(--muted)">📅 ${formatDate(app.appliedAt)}</p>
                                </div>
                                <span class="app-status" style="padding:6px 16px;border-radius:20px;font-size:13px;background:${app.status === 'pending' ? 'rgba(234,179,8,0.1)' : app.status === 'accepted' ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)'};color:${app.status === 'pending' ? '#eab308' : app.status === 'accepted' ? '#22c55e' : '#ef4444'}">${app.status || 'Pending'}</span>
                            </div>
                            <div class="job-actions" style="margin-top:12px;display:flex;gap:8px">
                                <button class="btn-secondary" onclick="viewApplicants('${app.jobId}')">👁️ View Job Applicants</button>
                                <button class="btn-secondary" onclick="contactApplicant('${app.jobseeker.email}')">📧 Contact</button>
                            </div>
                        </div>
                    `).join('')
                }
            </div>
        `;
    } catch (error) {
        container.innerHTML = '<p>Error loading applicants.</p><button class="btn-primary" onclick="loadDashboard()">Back</button>';
    }
}

async function updateApplicationStatus(applicationId, status) {
    try {
        const response = await applicationAPI.updateStatus(applicationId, status);
        if (response.success) {
            showToast(`Application ${status}!`, {type:'success'});
            // Reload current view
            const container = document.getElementById('dashboard-content');
            if (container.innerHTML.includes('All Applicants')) {
                showAllApplicants();
            } else {
                loadDashboard();
            }
        }
    } catch (error) {
        showToast('Error updating application status', {type:'error'});
    }
}

function contactApplicant(email) {
    window.location.href = `mailto:${email}?subject=Regarding Your Job Application`;
}

function showCompanyProfile() {
    const container = document.getElementById('dashboard-content');
    const companyName = localStorage.getItem('companyName') || localStorage.getItem('userName');
    const companyInfo = localStorage.getItem('companyInfo') || '';
    const companyWebsite = localStorage.getItem('companyWebsite') || '';
    const companyLocation = localStorage.getItem('userLocation') || '';
    
    container.innerHTML = `
        <div class="dashboard-view">
            <h3>Company Profile</h3>
            <button class="btn-secondary" onclick="loadDashboard()" style="margin-bottom:20px">← Back to Dashboard</button>
            <form onsubmit="event.preventDefault(); updateCompanyProfile()">
                <div class="form-group">
                    <label>Company Name:</label>
                    <input id="company-name" value="${companyName}" required>
                </div>
                <div class="form-group">
                    <label>Company Description:</label>
                    <textarea id="company-info" rows="4" placeholder="Tell candidates about your company...">${companyInfo}</textarea>
                </div>
                <div class="form-group">
                    <label>Website:</label>
                    <input id="company-website" type="url" value="${companyWebsite}" placeholder="https://example.com">
                </div>
                <div class="form-group">
                    <label>Location:</label>
                    <input id="company-location" value="${companyLocation}" placeholder="City, Country">
                </div>
                <div class="form-group">
                    <label>Industry:</label>
                    <select id="company-industry">
                        <option value="">Select Industry</option>
                        <option value="Technology">Technology</option>
                        <option value="Finance">Finance</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Education">Education</option>
                        <option value="Retail">Retail</option>
                        <option value="Manufacturing">Manufacturing</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Company Size:</label>
                    <select id="company-size">
                        <option value="">Select Size</option>
                        <option value="1-10">1-10 employees</option>
                        <option value="11-50">11-50 employees</option>
                        <option value="51-200">51-200 employees</option>
                        <option value="201-500">201-500 employees</option>
                        <option value="501+">501+ employees</option>
                    </select>
                </div>
                <div class="form-group">
                    <button type="submit" class="btn-primary">Save Profile</button>
                    <button type="button" class="btn-secondary" onclick="loadDashboard()">Cancel</button>
                </div>
            </form>
        </div>
    `;
    
    // Set saved values
    const savedIndustry = localStorage.getItem('companyIndustry');
    const savedSize = localStorage.getItem('companySize');
    if (savedIndustry) document.getElementById('company-industry').value = savedIndustry;
    if (savedSize) document.getElementById('company-size').value = savedSize;
}

function updateCompanyProfile() {
    const companyName = document.getElementById('company-name').value;
    const companyInfo = document.getElementById('company-info').value;
    const companyWebsite = document.getElementById('company-website').value;
    const companyLocation = document.getElementById('company-location').value;
    const companyIndustry = document.getElementById('company-industry').value;
    const companySize = document.getElementById('company-size').value;
    
    localStorage.setItem('companyName', companyName);
    localStorage.setItem('companyInfo', companyInfo);
    localStorage.setItem('companyWebsite', companyWebsite);
    localStorage.setItem('userLocation', companyLocation);
    localStorage.setItem('companyIndustry', companyIndustry);
    localStorage.setItem('companySize', companySize);
    
    showToast('Company profile updated successfully!', {type:'success'});
    loadDashboard();
}

async function editJobPosting(jobId) {
    const container = document.getElementById('dashboard-content');
    container.innerHTML = '<div style="text-align:center;padding:40px"><div class="loading-spinner"></div><p>Loading...</p></div>';
    
    // First try localStorage
    const localJobs = getEmployerJobs();
    let job = localJobs.find(j => j._id === jobId || j.id == jobId);
    
    // If not found in localStorage, try backend
    if (!job) {
        try {
            const response = await jobAPI.getMyJobs();
            job = response.jobs.find(j => j._id === jobId);
        } catch (error) {
            console.log('Backend error, using localStorage only');
        }
    }
    
    if (!job) {
        showToast('Job not found', {type:'error'});
        showManageJobs();
        return;
    }
    
    container.innerHTML = `
        <h3>Edit Job Posting</h3>
        <form onsubmit="event.preventDefault(); updateJobPosting('${jobId}')">
            <div class="form-group"><label>Job Title:</label><input id="edit-job-title" value="${job.title}" required></div>
            <div class="form-group"><label>Company:</label><input id="edit-job-company" value="${job.company}" required></div>
            <div class="form-group"><label>Location:</label><input id="edit-job-location" value="${job.location}" required></div>
            <div class="form-group"><label>Salary Range:</label><input id="edit-job-salary" value="${job.salary}" required></div>
            <div class="form-group"><label>Description:</label><textarea id="edit-job-desc" required>${job.description}</textarea></div>
            <div class="form-group"><label>Qualifications:</label><textarea id="edit-job-qual">${job.qualifications || ''}</textarea></div>
            <div class="form-group"><label>Responsibilities:</label><textarea id="edit-job-resp">${job.responsibilities || ''}</textarea></div>
            <div class="form-group">
                <button type="submit" class="btn-primary">Update Job</button>
                <button type="button" class="btn-secondary" onclick="showManageJobs()">Cancel</button>
            </div>
        </form>
    `;
}

async function updateJobPosting(jobId) {
    const jobData = {
        title: document.getElementById('edit-job-title').value,
        company: document.getElementById('edit-job-company').value,
        location: document.getElementById('edit-job-location').value,
        salary: document.getElementById('edit-job-salary').value,
        description: document.getElementById('edit-job-desc').value,
        qualifications: document.getElementById('edit-job-qual').value,
        responsibilities: document.getElementById('edit-job-resp').value
    };
    
    try {
        const response = await jobAPI.update(jobId, jobData);
        if (response.success) {
            // Update in localStorage too
            updateLocalJob(jobId, jobData);
            showToast('Job updated successfully!', {type:'success'});
            showManageJobs();
        }
    } catch (error) {
        // Fallback: Update in localStorage only
        updateLocalJob(jobId, jobData);
        showToast('Job updated successfully!', {type:'success'});
        showManageJobs();
    }
}

// Helper function to update job in localStorage
function updateLocalJob(jobId, jobData) {
    let employerJobs = JSON.parse(localStorage.getItem('employerJobs') || '[]');
    const jobIndex = employerJobs.findIndex(j => j._id === jobId || j.id == jobId);
    
    if (jobIndex !== -1) {
        employerJobs[jobIndex] = {
            ...employerJobs[jobIndex],
            ...jobData,
            updatedAt: new Date().toISOString()
        };
        localStorage.setItem('employerJobs', JSON.stringify(employerJobs));
        
        // Update in global jobs array too
        if (typeof jobs !== 'undefined') {
            const globalIndex = jobs.findIndex(j => j._id === jobId || j.id == jobId);
            if (globalIndex !== -1) {
                jobs[globalIndex] = {
                    ...jobs[globalIndex],
                    ...jobData
                };
            }
        }
    }
}

async function deleteJobPosting(jobId) {
    if (!confirm('Are you sure you want to delete this job posting? This action cannot be undone.')) {
        return;
    }
    
    try {
        const response = await jobAPI.delete(jobId);
        if (response.success) {
            // Delete from localStorage too
            deleteLocalJob(jobId);
            showToast('Job deleted successfully!', {type:'success'});
            showManageJobs();
        }
    } catch (error) {
        // Fallback: Delete from localStorage only
        deleteLocalJob(jobId);
        showToast('Job deleted successfully!', {type:'success'});
        showManageJobs();
    }
}

// Helper function to delete job from localStorage
function deleteLocalJob(jobId) {
    let employerJobs = JSON.parse(localStorage.getItem('employerJobs') || '[]');
    employerJobs = employerJobs.filter(j => j._id !== jobId && j.id != jobId);
    localStorage.setItem('employerJobs', JSON.stringify(employerJobs));
    
    // Remove from global jobs array too
    if (typeof jobs !== 'undefined') {
        const index = jobs.findIndex(j => j._id === jobId || j.id == jobId);
        if (index !== -1) {
            jobs.splice(index, 1);
        }
    }
}


// Job Search in Dashboard
function showJobSearchInDashboard() {
    const container = document.getElementById('dashboard-content');
    container.innerHTML = `
        <h3>🔍 Search Jobs</h3>
        <div class="search-bar" style="margin-bottom:20px;display:flex;gap:10px">
            <input type="text" id="dash-keyword" placeholder="Keywords (e.g., Frontend, Python)" style="flex:1">
            <select id="dash-location" style="flex:1">
                <option value="">Any Location</option>
                <option value="remote">Remote</option>
                <option value="new york">New York</option>
                <option value="boston">Boston</option>
                <option value="san francisco">San Francisco</option>
            </select>
            <button class="btn-primary" onclick="searchJobsInDash()">Search</button>
        </div>
        <div id="dash-results"></div>
    `;
    displayDashJobs(jobs.slice(0, 15));
}

function searchJobsInDash() {
    const keyword = document.getElementById('dash-keyword').value.toLowerCase();
    const location = document.getElementById('dash-location').value.toLowerCase();
    
    const filtered = jobs.filter(job => {
        const matchKey = !keyword || job.title.toLowerCase().includes(keyword) || job.description.toLowerCase().includes(keyword);
        const matchLoc = !location || job.location.toLowerCase().includes(location);
        return matchKey && matchLoc;
    });
    
    displayDashJobs(filtered);
}

function displayDashJobs(jobList) {
    const container = document.getElementById('dash-results');
    if (!container) return;
    
    if (jobList.length === 0) {
        container.innerHTML = '<p>No jobs found.</p>';
        return;
    }
    
    container.innerHTML = `<h4>Found ${jobList.length} jobs</h4>`;
    jobList.forEach(job => {
        container.innerHTML += `
            <div class="job-card">
                <h3>${job.title}</h3>
                <p><strong>${job.company}</strong> • ${job.location} • ${job.salary}</p>
                <p>${job.description.substring(0, 120)}...</p>
                <div class="job-actions">
                    <button class="apply-btn" onclick="localStorage.setItem('currentJobs',JSON.stringify(jobs));window.location.href='apply.html?jobId=${job.id}'">Apply Now</button>
                    <button class="view-company-btn" onclick="viewCompanyProfile('${job.company}')">View Company</button>
                </div>
            </div>
        `;
    });
}

function viewCompanyProfile(companyName) {
    const container = document.getElementById('dashboard-content');
    const company = companyProfiles[companyName];
    
    if (!company) {
        showToast(`Company profile not found`, {type:'info'});
        return;
    }
    
    const companyJobs = jobs.filter(job => job.company === companyName);
    
    container.innerHTML = `
        <div class="dashboard-view">
            <h3>🏢 ${company.name}</h3>
            <button class="btn-secondary" onclick="showJobSearchInDashboard()" style="margin-bottom:20px">← Back to Jobs</button>
            <div style="padding:20px;background:rgba(14,165,164,0.05);border-radius:12px;margin-bottom:20px">
                <p style="margin:8px 0;color:var(--muted)">${company.description}</p>
                ${company.website ? `<p style="margin:8px 0"><strong>🌐 Website:</strong> <a href="https://${company.website}" target="_blank" style="color:var(--accent)">${company.website}</a></p>` : ''}
            </div>
            <h4>Open Positions (${companyJobs.length})</h4>
            ${companyJobs.length === 0 ? 
                '<p style="color: var(--muted);">No open positions at the moment.</p>' :
                companyJobs.map(job => `
                    <div class="job-card">
                        <h3>${job.title}</h3>
                        <p><strong>${job.company}</strong> • ${job.location} • ${job.salary}</p>
                        <p class="job-desc">${job.description.substring(0, 150)}...</p>
                        <div class="job-actions">
                            <button class="apply-btn" onclick="localStorage.setItem('currentJobs',JSON.stringify(jobs));window.location.href='apply.html?jobId=${job.id}'">Apply Now</button>
                            <button class="save-btn" onclick="toggleSaveJobCompany(${job.id})">${window.jobFeatures && window.jobFeatures.isJobSaved(job.id) ? '❤️ Saved' : '🤍 Save'}</button>
                        </div>
                    </div>
                `).join('')
            }
        </div>
    `;
}

function toggleSaveJobCompany(jobId) {
    if (!window.jobFeatures) return;
    
    if (window.jobFeatures.isJobSaved(jobId)) {
        window.jobFeatures.unsaveJob(jobId);
    } else {
        window.jobFeatures.saveJob(jobId);
    }
    
    const companyName = jobs.find(j => j.id === jobId)?.company;
    if (companyName) viewCompanyProfile(companyName);
}



// Get application count
function getApplicationCount() {
    return parseInt(localStorage.getItem('applicationCount') || '0');
}

// Get recent applications for overview
function getRecentApplications() {
    try {
        const applications = JSON.parse(localStorage.getItem('userApplications') || '[]');
        
        if (applications.length === 0) {
            return '<p style="color: var(--muted); font-style: italic;">No recent activity. <a href="#" onclick="showJobSearchInDashboard()" style="color: var(--accent);">Start applying to jobs!</a></p>';
        }
        
        const recent = applications.slice(-3).reverse();
        return `
            <ul class="dashboard-list">
                ${recent.map(app => `
                    <li>
                        <div>
                            <strong>Applied to ${app.jobTitle}</strong><br>
                            <small style="color: var(--muted);">${app.company} • ${formatDate(app.appliedAt)}</small>
                        </div>
                        <span class="app-status">${app.status || 'Submitted'}</span>
                    </li>
                `).join('')}
            </ul>
        `;
    } catch (error) {
        return '<p style="color: var(--muted);">No recent activity</p>';
    }
}

// Show all applications
function showMyApplications() {
    const container = document.getElementById('dashboard-content');
    const applications = JSON.parse(localStorage.getItem('userApplications') || '[]');
    
    container.innerHTML = `
        <div class="dashboard-view">
            <h3>My Applications (${applications.length})</h3>
            <button class="btn-secondary" onclick="loadDashboard()" style="margin-bottom:20px">← Back to Dashboard</button>
            ${applications.length === 0 ? 
                '<p style="color: var(--muted); font-style: italic;">No applications submitted yet. <a href="#" onclick="showJobSearchInDashboard()" style="color: var(--accent);">Browse jobs</a> to get started!</p>' :
                applications.map((app, index) => `
                    <div class="job-card" style="margin:15px 0;padding:20px;border:1px solid #eee;border-radius:12px;background:white">
                        <div style="display:flex;justify-content:space-between;align-items:start">
                            <div style="flex:1">
                                <h4 style="margin:0 0 8px 0;color:var(--primary)">${app.jobTitle}</h4>
                                <p style="margin:4px 0;color:var(--muted)">🏢 ${app.company}</p>
                                <p style="margin:4px 0;color:var(--muted)">📅 Applied: ${formatDate(app.appliedAt)}</p>
                                <p style="margin:4px 0;color:var(--muted)">💼 Experience: ${app.experience}</p>
                                <p style="margin:4px 0;color:var(--muted)">🛠️ Skills: ${app.skills.substring(0, 80)}${app.skills.length > 80 ? '...' : ''}</p>
                            </div>
                            <span class="app-status" style="padding:8px 16px;border-radius:20px;font-size:13px;font-weight:600;background:${app.status === 'withdrawn' ? 'rgba(107,114,128,0.1)' : app.status === 'accepted' ? 'rgba(34,197,94,0.1)' : app.status === 'rejected' ? 'rgba(239,68,68,0.1)' : 'rgba(234,179,8,0.1)'};color:${app.status === 'withdrawn' ? '#6b7280' : app.status === 'accepted' ? '#22c55e' : app.status === 'rejected' ? '#ef4444' : '#eab308'}">${app.status === 'withdrawn' ? '🚫 Withdrawn' : app.status === 'accepted' ? '✅ Accepted' : app.status === 'rejected' ? '❌ Rejected' : '⏳ Pending'}</span>
                        </div>
                        ${app.status !== 'withdrawn' && app.status !== 'accepted' && app.status !== 'rejected' ? `
                            <div style="margin-top:15px;padding-top:15px;border-top:1px solid #eee">
                                <button class="btn-secondary" onclick="withdrawApplication(${index})" style="background:#ef4444;color:white">🗑️ Delete Application</button>
                            </div>
                        ` : ''}
                        ${app.status === 'withdrawn' || app.status === 'rejected' ? `
                            <div style="margin-top:15px;padding-top:15px;border-top:1px solid #eee">
                                <button class="btn-secondary" onclick="withdrawApplication(${index})" style="background:#6b7280;color:white">🗑️ Remove from List</button>
                            </div>
                        ` : ''}
                    </div>
                `).join('')
            }
        </div>
    `;
}

// Withdraw application function
function withdrawApplication(index) {
    if (!confirm('Are you sure you want to withdraw and delete this application? This action cannot be undone.')) {
        return;
    }
    
    let applications = JSON.parse(localStorage.getItem('userApplications') || '[]');
    
    if (applications[index]) {
        // Remove the application completely
        applications.splice(index, 1);
        
        // Update application count
        localStorage.setItem('applicationCount', applications.length.toString());
        
        // Save updated applications
        localStorage.setItem('userApplications', JSON.stringify(applications));
        
        // Show success message
        showToast('Application deleted successfully', {type:'success'});
        
        // Refresh the view
        showMyApplications();
    }
}

// Format date helper
function formatDate(dateString) {
    try {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) return 'today';
        if (diffDays === 2) return 'yesterday';
        if (diffDays <= 7) return `${diffDays - 1} days ago`;
        
        return date.toLocaleDateString();
    } catch (error) {
        return 'recently';
    }
}

// Show saved jobs
function showSavedJobs() {
    const container = document.getElementById('dashboard-content');
    const savedJobIds = JSON.parse(localStorage.getItem('savedJobs') || '[]');
    const savedJobs = jobs.filter(job => savedJobIds.includes(job.id));
    
    container.innerHTML = `
        <div class="dashboard-view">
            <h3>Saved Jobs (${savedJobs.length})</h3>
            <button class="btn-secondary" onclick="loadDashboard()" style="margin-bottom:20px">← Back to Dashboard</button>
            ${savedJobs.length === 0 ? 
                '<p style="color: var(--muted); font-style: italic;">No saved jobs yet. <a href="#" onclick="showJobSearchInDashboard()" style="color: var(--accent);">Browse jobs</a> to save some!</p>' :
                savedJobs.map(job => `
                    <div class="job-card">
                        <h3>${job.title}</h3>
                        <p><strong>${job.company}</strong> • ${job.location} • ${job.salary}</p>
                        <p class="job-desc">${job.description.substring(0, 150)}...</p>
                        <div class="job-actions">
                            <button class="apply-btn" onclick="localStorage.setItem('currentJobs',JSON.stringify(jobs));window.location.href='apply.html?jobId=${job.id}'">Apply Now</button>
                            <button class="save-btn" onclick="removeSavedJobDash(${job.id})">❤️ Remove</button>
                        </div>
                    </div>
                `).join('')
            }
        </div>
    `;
}

function redirectToApply(jobId) {
    applyForJob(jobId);
}

// Remove saved job in dashboard
function removeSavedJobDash(jobId) {
    const savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');
    const filtered = savedJobs.filter(id => id !== jobId);
    localStorage.setItem('savedJobs', JSON.stringify(filtered));
    showSavedJobs(); // Refresh the view
}

// Toggle save job in dashboard
function toggleSaveJobDash(jobId) {
    if (window.jobFeatures) {
        window.jobFeatures.unsaveJob(jobId);
        showSavedJobs(); // Refresh the view
    }
}

// Upload Resume Function
function showUploadResume() {
    const container = document.getElementById('dashboard-content');
    const currentResume = localStorage.getItem('userResume');
    const resumeName = localStorage.getItem('userResumeName') || 'No file uploaded';
    
    container.innerHTML = `
        <div class="dashboard-view">
            <h3>📄 Upload Resume</h3>
            <button class="btn-secondary" onclick="loadDashboard()" style="margin-bottom:20px">← Back to Dashboard</button>
            
            ${currentResume ? `
                <div style="padding:20px;background:rgba(16,185,129,0.1);border-radius:12px;margin-bottom:20px;border-left:4px solid #10b981">
                    <h4 style="margin:0 0 8px 0;color:#10b981">✓ Resume Uploaded</h4>
                    <p style="margin:4px 0;color:var(--muted)">📎 ${resumeName}</p>
                    <button class="btn-secondary" onclick="deleteResume()" style="background:#ef4444;color:white;margin-top:12px">🗑️ Delete Resume</button>
                </div>
            ` : ''}
            
            <div style="padding:20px;background:rgba(59,130,246,0.05);border-radius:12px;margin-bottom:20px">
                <h4>Upload New Resume</h4>
                <p style="color:var(--muted);font-size:14px;margin:8px 0">Upload your resume in PDF, DOC, or DOCX format (Max 5MB)</p>
                
                <form onsubmit="event.preventDefault(); handleResumeUpload()" style="margin-top:20px">
                    <div class="form-group">
                        <label>Select Resume File:</label>
                        <input type="file" id="resume-file" accept=".pdf,.doc,.docx" required style="padding:10px;border:2px dashed #ddd;border-radius:8px;width:100%;cursor:pointer">
                    </div>
                    <div class="form-group">
                        <button type="submit" class="btn-primary">📤 Upload Resume</button>
                        <button type="button" class="btn-secondary" onclick="loadDashboard()">Cancel</button>
                    </div>
                </form>
            </div>
            
            <div style="padding:20px;background:rgba(234,179,8,0.05);border-radius:12px">
                <h5>💡 Tips for a Great Resume</h5>
                <ul style="margin:8px 0;padding-left:20px;color:var(--muted);font-size:14px">
                    <li>Keep it concise (1-2 pages)</li>
                    <li>Highlight relevant skills and experience</li>
                    <li>Use clear formatting and bullet points</li>
                    <li>Include measurable achievements</li>
                    <li>Proofread for errors</li>
                </ul>
            </div>
        </div>
    `;
}

function handleResumeUpload() {
    const fileInput = document.getElementById('resume-file');
    const file = fileInput.files[0];
    
    if (!file) {
        showToast('Please select a file', {type:'error'});
        return;
    }
    
    // Check file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
        showToast('File size must be less than 5MB', {type:'error'});
        return;
    }
    
    // Check file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
        showToast('Only PDF, DOC, and DOCX files are allowed', {type:'error'});
        return;
    }
    
    // Convert to base64 and store
    const reader = new FileReader();
    reader.onload = function(e) {
        localStorage.setItem('userResume', e.target.result);
        localStorage.setItem('userResumeName', file.name);
        localStorage.setItem('userResumeType', file.type);
        localStorage.setItem('userResumeSize', file.size);
        localStorage.setItem('userResumeUploadDate', new Date().toISOString());
        
        showToast('Resume uploaded successfully!', {type:'success'});
        loadDashboard();
    };
    reader.onerror = function() {
        showToast('Error uploading resume', {type:'error'});
    };
    reader.readAsDataURL(file);
}

function deleteResume() {
    if (confirm('Are you sure you want to delete your resume?')) {
        localStorage.removeItem('userResume');
        localStorage.removeItem('userResumeName');
        localStorage.removeItem('userResumeType');
        localStorage.removeItem('userResumeSize');
        localStorage.removeItem('userResumeUploadDate');
        
        showToast('Resume deleted successfully', {type:'success'});
        showUploadResume();
    }
}

// Logout function
function logoutUser() {
    if (confirm('Are you sure you want to logout?')) {
        simulateLogout();
        // Clear profile photo data
        localStorage.removeItem('userPhoto');
        localStorage.removeItem('userPhotoName');
        localStorage.removeItem('loginProvider');
        showToast('Logged out successfully!', {type:'info'});
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 500);
    }
}

function showAdvancedMenu() {
    const container = document.getElementById('dashboard-content');
    container.innerHTML = `
        <h3>⚙️ Advanced Features</h3>
        <div class="dashboard-section">
            <button class="btn-primary full-width" onclick="showJobAlerts()">🔔 Job Alerts</button>
            <button class="btn-primary full-width" onclick="showAnalytics()">📊 Analytics</button>
            <button class="btn-primary full-width" onclick="showMessages()">💬 Messages</button>
            <button class="btn-primary full-width" onclick="showInterviews()">📅 Interviews</button>
            <button class="btn-primary full-width" onclick="showCategories()">📂 Browse by Category</button>
            <button class="btn-primary full-width" onclick="showSearchHistory()">🕐 Search History</button>
            <button class="btn-primary full-width" onclick="showSalaryCalc()">💰 Salary Calculator</button>
            <button class="btn-secondary full-width" onclick="loadDashboard()">← Back</button>
        </div>
    `;
}
