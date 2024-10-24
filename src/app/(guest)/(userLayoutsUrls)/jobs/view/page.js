import React from 'react'
import JobView from './JobView'

const jobData = {
    title: 'Sales Manager (Remote)',
    company: 'SalesPro Inc.',
    companyLogo: '/salespro-logo.png',
    location: 'Work from home',
    startDate: 'Immediately',
    ctc: '₹ 5,00,000',
    experience: '3-5 years',
    applyBy: "15 Mar' 24",
    postedAgo: 'Posted 1 week ago • Mid-level Job',
    responsibilities: [
        'Develop and execute sales strategies to achieve company goals and targets',
        'Manage and lead the sales team, providing guidance and support',
        'Build and maintain strong client relationships to drive business growth',
        'Analyze sales metrics and prepare reports to inform strategic decisions',
        'Identify new business opportunities and potential clients',
        'Negotiate contracts and close deals to meet sales targets',
        'Collaborate with marketing and product teams to enhance sales strategies',
        'Stay updated with industry trends and competitor activities',
    ],
    skills: [
        'Sales Strategy',
        'Team Management',
        'Client Relationship Management',
        'Negotiation',
    ],
    certifications: [
        'Certified Sales Professional (CSP)',
        'Advanced Sales Management',
        'Negotiation Skills Training',
        'Leadership and Management',
        'Customer Relationship Management (CRM)',
    ],
    probation: {
        duration: '3 months',
        salary: '₹40,000/month',
    },
    postProbation: {
        annualCTC: '₹ 5,00,000/year',
    },
    perks: ['Health Insurance', 'Travel Allowance', 'Performance Bonus'],
    openings: 2,
    aboutCompany:
        'SalesPro Inc. is a leading sales solutions provider committed to helping businesses achieve their sales targets through innovative strategies and expert support. Our team is passionate about driving results and delivering exceptional service to our clients.',
    activity: {
        hiringSince: 'January 2020',
        opportunitiesPosted: 25,
        candidatesHired: 15,
    },
    isApplicationOpen: true,
}

const Page = () => {
    return <JobView {...jobData} />
}

export default Page
