const mongoose = require('mongoose');
require('dotenv').config();

const Job = require('./models/Job');

// Sample jobs data - 50 jobs
const sampleJobs = [
    { title: "Frontend Intern", company: "TechNova", location: "Remote", salary: "28k-38k", description: "Assist in building responsive web UIs with React and modern CSS.", qualifications: "HTML, CSS, JavaScript basics", responsibilities: "Build UI components, code reviews" },
    { title: "Backend Intern", company: "ByteWorks", location: "New York", salary: "30k-40k", description: "Work on REST APIs and microservices with Node.js/Express.", qualifications: "Node.js, Express", responsibilities: "API development, testing" },
    { title: "Full Stack Intern", company: "DataPulse", location: "San Francisco", salary: "32k-45k", description: "Contribute to frontend and backend features in a cloud environment.", qualifications: "MERN Stack", responsibilities: "Full stack development" },
    { title: "DevOps Intern", company: "CloudForge", location: "Remote", salary: "30k-42k", description: "Help automate CI/CD and manage container workflows (Docker/K8s).", qualifications: "Docker, CI/CD", responsibilities: "Deployment automation" },
    { title: "Data Science Intern", company: "NextGen Labs", location: "Boston", salary: "34k-44k", description: "Work with datasets to build ML models and exploratory analysis.", qualifications: "Python, ML basics", responsibilities: "Data analysis, ML models" },
    { title: "Machine Learning Intern", company: "SysWave", location: "Austin", salary: "36k-48k", description: "Experiment with neural models and assist with model deployment.", qualifications: "Python, TensorFlow", responsibilities: "ML model development" },
    { title: "QA Intern", company: "NetCore", location: "Chicago", salary: "26k-36k", description: "Write test cases and automate test suites for web applications.", qualifications: "Testing basics", responsibilities: "Test automation" },
    { title: "Mobile Dev Intern", company: "QuantumSoft", location: "Seattle", salary: "30k-40k", description: "Develop React Native components and mobile UI flows.", qualifications: "React Native", responsibilities: "Mobile app development" },
    { title: "UI/UX Intern", company: "AlgoWorks", location: "Remote", salary: "25k-35k", description: "Design interfaces and perform usability testing with users.", qualifications: "Figma, Design basics", responsibilities: "UI design, user testing" },
    { title: "Security Intern", company: "PixelCraft", location: "Los Angeles", salary: "32k-42k", description: "Assist in vulnerability assessments and secure coding reviews.", qualifications: "Security basics", responsibilities: "Security testing" },
    { title: "Frontend Developer", company: "BlueOcean Tech", location: "Remote", salary: "45k-60k", description: "Build modern web apps using React and TypeScript.", qualifications: "React, TypeScript, 2+ years", responsibilities: "Frontend development, mentoring" },
    { title: "Backend Developer", company: "GreenByte", location: "Boston", salary: "48k-65k", description: "Design scalable services and APIs in Node/Python.", qualifications: "Node.js, Python, 3+ years", responsibilities: "API design, database optimization" },
    { title: "Full Stack Developer", company: "SilverLine", location: "Chicago", salary: "50k-70k", description: "Work across frontend and backend to deliver features.", qualifications: "MERN Stack, 3+ years", responsibilities: "Full stack development" },
    { title: "Data Engineer", company: "Mercury Labs", location: "Seattle", salary: "55k-75k", description: "Develop ETL pipelines and data warehouses.", qualifications: "SQL, Python, ETL", responsibilities: "Data pipeline development" },
    { title: "ML Engineer", company: "Orion Systems", location: "Remote", salary: "60k-85k", description: "Productionize ML models and monitoring systems.", qualifications: "Python, ML, 4+ years", responsibilities: "ML deployment, monitoring" },
    { title: "QA Automation Engineer", company: "HelixSoft", location: "Los Angeles", salary: "42k-58k", description: "Build automated test frameworks and CI integration.", qualifications: "Selenium, CI/CD", responsibilities: "Test automation" },
    { title: "Mobile Engineer", company: "ApexCloud", location: "San Francisco", salary: "52k-68k", description: "Develop native and cross-platform mobile apps.", qualifications: "React Native, Swift", responsibilities: "Mobile development" },
    { title: "Cloud Architect", company: "StellarData", location: "Austin", salary: "80k-110k", description: "Architect cloud solutions on AWS/GCP/Azure.", qualifications: "AWS, 5+ years", responsibilities: "Cloud architecture" },
    { title: "Data Analyst", company: "HorizonTech", location: "New York", salary: "45k-60k", description: "Perform data analysis and build dashboards.", qualifications: "SQL, Excel, Tableau", responsibilities: "Data analysis, reporting" },
    { title: "Security Engineer", company: "Vertex Solutions", location: "Washington DC", salary: "65k-90k", description: "Implement security controls and SOC tooling.", qualifications: "Security, 4+ years", responsibilities: "Security implementation" },
    { title: "Systems Engineer", company: "NimbusSoft", location: "Remote", salary: "50k-70k", description: "Manage and improve internal systems and tooling.", qualifications: "Linux, Systems", responsibilities: "System management" },
    { title: "Network Engineer", company: "EchoTech", location: "Boston", salary: "48k-62k", description: "Design and troubleshoot network infrastructure.", qualifications: "Networking, Cisco", responsibilities: "Network design" },
    { title: "Database Engineer", company: "Catalyst Systems", location: "Chicago", salary: "55k-75k", description: "Optimize database performance and backups.", qualifications: "SQL, MongoDB", responsibilities: "Database optimization" },
    { title: "Graphics Programmer", company: "FusionWorks", location: "Los Angeles", salary: "58k-78k", description: "Work on rendering pipelines and shader development.", qualifications: "OpenGL, C++", responsibilities: "Graphics programming" },
    { title: "Embedded Firmware Engineer", company: "VantageAI", location: "Austin", salary: "54k-72k", description: "Develop firmware for embedded devices in C/C++.", qualifications: "C/C++, Embedded", responsibilities: "Firmware development" },
    { title: "Site Reliability Engineer", company: "Beacon Tech", location: "Remote", salary: "70k-95k", description: "Improve service reliability and incident response.", qualifications: "SRE, 4+ years", responsibilities: "Reliability engineering" },
    { title: "AI Engineer", company: "Summit Systems", location: "New York", salary: "75k-100k", description: "Build and deploy AI-driven features in production.", qualifications: "AI/ML, 5+ years", responsibilities: "AI development" },
    { title: "DevTools Engineer", company: "Pioneer Labs", location: "Seattle", salary: "60k-85k", description: "Create developer tools that boost engineering velocity.", qualifications: "Tools development", responsibilities: "Developer tools" },
    { title: "Platform Engineer", company: "Zenith Technologies", location: "Boston", salary: "68k-92k", description: "Build internal platforms for scalable deployments.", qualifications: "Platform, 4+ years", responsibilities: "Platform development" },
    { title: "Cloud Security Engineer", company: "Synapse Tech", location: "Remote", salary: "72k-98k", description: "Harden cloud environments and secure deployments.", qualifications: "Cloud Security, 5+ years", responsibilities: "Cloud security" },
    { title: "Data Platform Engineer", company: "BinaryEdge", location: "Chicago", salary: "66k-88k", description: "Build data ingestion and transformation pipelines.", qualifications: "Data Engineering", responsibilities: "Data platforms" },
    { title: "Visualization Engineer", company: "TerraSoft", location: "Remote", salary: "48k-64k", description: "Build interactive visualizations and dashboards.", qualifications: "D3.js, Visualization", responsibilities: "Data visualization" },
    { title: "Network Security Engineer", company: "OptiData", location: "New York", salary: "68k-92k", description: "Implement network security and IDS/IPS solutions.", qualifications: "Network Security", responsibilities: "Security implementation" },
    { title: "Firmware Engineer", company: "NovaCore", location: "Austin", salary: "60k-80k", description: "Develop low-level firmware for IoT devices.", qualifications: "Firmware, C", responsibilities: "IoT firmware" },
    { title: "Systems Programmer", company: "RapidScale", location: "Seattle", salary: "64k-86k", description: "Work on systems software and performance tuning.", qualifications: "Systems Programming", responsibilities: "System optimization" },
    { title: "Cloud Ops Engineer", company: "LumaTech", location: "Remote", salary: "58k-78k", description: "Operate cloud infrastructure and automation scripts.", qualifications: "Cloud Ops", responsibilities: "Cloud operations" },
    { title: "Data Scientist", company: "Arcane Systems", location: "Boston", salary: "70k-95k", description: "Develop predictive models and data-driven insights.", qualifications: "Data Science, 4+ years", responsibilities: "ML modeling" },
    { title: "Full Stack Engineer", company: "ByteSphere", location: "Chicago", salary: "66k-90k", description: "Ship end-to-end features across web stack.", qualifications: "Full Stack, 4+ years", responsibilities: "Feature development" },
    { title: "Mobile QA Engineer", company: "Circuit Labs", location: "Los Angeles", salary: "44k-60k", description: "Test mobile applications across platforms.", qualifications: "Mobile Testing", responsibilities: "QA testing" },
    { title: "Platform Security Engineer", company: "DriftSoft", location: "Remote", salary: "72k-100k", description: "Secure the platform and implement best practices.", qualifications: "Security, 5+ years", responsibilities: "Platform security" },
    { title: "AI Ops Engineer", company: "NextCloud", location: "Austin", salary: "62k-85k", description: "Operate ML systems and monitoring pipelines.", qualifications: "ML Ops", responsibilities: "ML operations" },
    { title: "Cloud Developer", company: "Meridian Tech", location: "San Francisco", salary: "58k-80k", description: "Build cloud-native services and APIs.", qualifications: "Cloud Development", responsibilities: "Cloud services" },
    { title: "Security Automation Engineer", company: "Quantum Leap", location: "Remote", salary: "68k-92k", description: "Automate security scans and incident response.", qualifications: "Security Automation", responsibilities: "Security automation" },
    { title: "Big Data Engineer", company: "LogicTree", location: "New York", salary: "70k-98k", description: "Design and maintain large-scale data systems.", qualifications: "Big Data, Hadoop", responsibilities: "Big data systems" },
    { title: "Release Engineer", company: "CoreDynamics", location: "Remote", salary: "60k-82k", description: "Manage release processes and CI tooling.", qualifications: "Release Management", responsibilities: "Release automation" },
    { title: "Monitoring Engineer", company: "AlphaSoft", location: "Austin", salary: "56k-76k", description: "Build systems for observability and alerts.", qualifications: "Monitoring Tools", responsibilities: "System monitoring" },
    { title: "Cloud Cost Engineer", company: "Gamma Labs", location: "Remote", salary: "64k-86k", description: "Analyze cloud spend and optimize costs.", qualifications: "Cloud Cost Management", responsibilities: "Cost optimization" },
    { title: "AI Researcher", company: "Delta Systems", location: "San Francisco", salary: "85k-120k", description: "Conduct advanced research and publishable work.", qualifications: "PhD, AI Research", responsibilities: "AI research" },
    { title: "Database Administrator", company: "Sigma Dynamics", location: "Boston", salary: "62k-84k", description: "Manage DB clusters and backups at scale.", qualifications: "DBA, 4+ years", responsibilities: "Database administration" },
    { title: "IoT Developer", company: "TeraWorks", location: "Remote", salary: "58k-80k", description: "Build IoT solutions and device integrations.", qualifications: "IoT Development", responsibilities: "IoT solutions" }
];

async function seedJobs() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Get first user as employer
        const User = require('./models/User');
        let employer = await User.findOne({ role: 'employer' });
        
        if (!employer) {
            console.log('No employer found. Creating sample employer...');
            employer = await User.create({
                name: 'Sample Employer',
                email: 'employer@test.com',
                password: '123456',
                role: 'employer',
                companyName: 'Sample Company'
            });
        }

        // Optional: Clear existing jobs (comment out if you want to keep existing jobs)
        // await Job.deleteMany({});
        // console.log('Cleared existing jobs');

        // Add jobs with employer ID
        const jobsWithEmployer = sampleJobs.map(job => ({
            ...job,
            employer: employer._id
        }));

        await Job.insertMany(jobsWithEmployer);
        console.log(`✅ Added ${sampleJobs.length} sample jobs to database`);
        console.log('Jobs are now available in the portal!');

        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

seedJobs();
