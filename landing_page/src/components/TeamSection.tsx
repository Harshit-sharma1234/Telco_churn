import { FaLinkedin, FaGithub, FaInstagram, FaEnvelope } from "react-icons/fa";
import profilePic from "../assets/1666982654952.jpeg";


export function TeamSection() {
  const teamMembers = [
    {
      name: "Harshit Sharma",
      role: "Full Stack Developer | ML Enthusiast",
      description:
        "Built the R-based Telco Customer Churn model and this React landing page. Stack includes caret, ggplot2, tidyr, plotly, and a Shiny dashboard.",
      // 🔥 Replace this with your LinkedIn profile pic URL (right click -> Copy Image Address)
      image:
        "https://media.licdn.com/dms/image/v2/D4D03AQFPzSzhCRuGmA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1666982654952?e=1758758400&v=beta&t=3kM0QMKSSHI3SCebCJ7sVU9Ocyt7DagBH4WF0UdoFx0",
      skills: ["React", "Node.js", "MongoDB", "Machine Learning"],
      links: {
        linkedin: "https://www.linkedin.com/in/harshit-sharma-629439230/",
        github: "https://github.com/Harshit-sharma1234",
        email: "mailto:harshitmrsharma@gmail.com",
        insta: "https://instagram.com/", // add your insta if you want
      },
    },
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-black py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Meet the Team
          </h2>
          <p className="text-xl text-purple-200 max-w-3xl mx-auto leading-relaxed">
            This project blends robust R-based churn modeling with a modern React
            interface and an interactive Shiny dashboard. I’m responsible for the
            end-to-end implementation — data, modeling, and UI.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center place-items-center">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="relative rounded-2xl p-[2px] bg-gradient-to-r from-purple-500 via-pink-500 to-purple-700 shadow-lg hover:scale-105 transition-transform"
            >
              <div className="bg-black rounded-2xl p-6 text-center h-full">
                {/* Profile Pic with Gradient Border */}
                <div className="w-28 h-28 mx-auto mb-4 rounded-full p-[3px] bg-gradient-to-r from-purple-500 via-pink-500 to-purple-700">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>

                <h3 className="text-xl font-semibold text-white mb-2">
                  {member.name}
                </h3>

                <div className="text-sm font-medium text-purple-300 mb-3 px-3 py-1 bg-purple-900/40 rounded-full inline-block">
                  {member.role}
                </div>

                <p className="text-sm text-gray-300 leading-relaxed mb-4">
                  {member.description}
                </p>

                <div className="flex flex-wrap justify-center gap-2 mb-4">
                  {member.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="text-xs px-2 py-1 bg-purple-700/30 text-purple-200 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Social Links with Hover Effect */}
                <div className="flex justify-center gap-4 mt-4">
                  <a
                    href={member.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-300 hover:text-purple-500 transition"
                  >
                    <FaLinkedin size={22} />
                  </a>
                  <a
                    href={member.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-300 hover:text-purple-500 transition"
                  >
                    <FaGithub size={22} />
                  </a>
                  <a
                    href={member.links.insta}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-300 hover:text-purple-500 transition"
                  >
                    <FaInstagram size={22} />
                  </a>
                  <a
                    href={member.links.email}
                    className="text-purple-300 hover:text-purple-500 transition"
                  >
                    <FaEnvelope size={22} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
