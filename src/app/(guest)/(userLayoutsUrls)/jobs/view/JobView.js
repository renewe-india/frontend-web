// components/JobView.js
import React from 'react'
import Image from 'next/image'

const JobView = ({
    title,
    company,
    companyLogo,
    location,
    startDate,
    ctc,
    experience,
    applyBy,
    postedAgo,
    responsibilities,
    skills,
    certifications,
    probation,
    postProbation,
    perks,
    openings,
    aboutCompany,
    activity,
    isApplicationOpen,
}) => {
    return (
        <div className="card bg-base-200 rounded-lg p-5">
            <h1 className="text-2xl font-bold mb-4">{title}</h1>
            <div className="flex items-center mb-4">
                <Image
                    src={companyLogo}
                    alt={`${company} Logo`}
                    width={40}
                    height={40}
                    className="rounded-full"
                />
                <div className="ml-2">
                    <h2 className="font-bold">{company}</h2>
                    <p className="text-gray-500">{location}</p>
                </div>
            </div>
            <div className="flex lg:flex-row flex-col justify-between mb-4">
                <div>
                    <p className="font-bold">Start Date:</p>
                    <p>{startDate}</p>
                </div>
                <div>
                    <p className="font-bold">CTC (Annual):</p>
                    <p>{ctc}</p>
                </div>
                <div>
                    <p className="font-bold">Experience:</p>
                    <p>{experience}</p>
                </div>
                <div>
                    <p className="font-bold">Apply By:</p>
                    <p>{applyBy}</p>
                </div>
            </div>
            <p className="text-gray-500 mb-4">{postedAgo}</p>

            <h2 className="text-xl font-bold mb-2">About the Job</h2>
            <h3 className="text-lg font-bold mb-2">Key Responsibilities:</h3>
            <ul className="list-decimal ml-6">
                {responsibilities.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>

            <h3 className="text-lg font-bold mb-2">Skill(s) Required:</h3>
            <div className="flex flex-wrap gap-2 mb-2">
                {skills.map((skill, index) => (
                    <div key={index} className="badge badge-primary">
                        {skill}
                    </div>
                ))}
            </div>

            <h3 className="text-lg font-bold mb-2">
                Earn Certifications in these Skills:
            </h3>
            <ul className="list-disc ml-6">
                {certifications.map((cert, index) => (
                    <li key={index}>{cert}</li>
                ))}
            </ul>

            <h3 className="text-lg font-bold mb-2">Salary:</h3>
            <p className="mb-2">Probation:</p>
            <ul className="list-disc ml-6">
                <li>Duration: {probation.duration}</li>
                <li>Salary during probation: {probation.salary}</li>
            </ul>
            <p className="mb-2">After Probation:</p>
            <ul className="list-disc ml-6">
                <li>Annual CTC: {postProbation.annualCTC}</li>
            </ul>

            <h3 className="text-lg font-bold mb-2">Perks:</h3>
            <ul className="list-disc ml-6">
                {perks.map((perk, index) => (
                    <li key={index}>{perk}</li>
                ))}
            </ul>

            <h3 className="text-lg font-bold mb-2">Number of Openings:</h3>
            <p>{openings}</p>

            <h2 className="text-xl font-bold mb-2">About {company}</h2>
            <p className="mb-2">Website:</p>
            <p>{aboutCompany}</p>

            <h3 className="text-lg font-bold mb-2">Activity on Internshala:</h3>
            <ul className="list-disc ml-6">
                <li>Hiring since {activity.hiringSince}</li>
                <li>{activity.opportunitiesPosted} opportunities posted</li>
                <li>{activity.candidatesHired} candidates hired</li>
            </ul>

            <button
                className={`btn ${
                    isApplicationOpen ? 'btn-primary' : 'btn-disabled'
                } text-white font-bold py-2 px-4 rounded mt-4`}
                disabled={!isApplicationOpen}>
                {isApplicationOpen ? 'Apply Now' : 'Closed for Applications'}
            </button>
        </div>
    )
}

export default JobView
