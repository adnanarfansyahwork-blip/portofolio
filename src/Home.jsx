import React, { useState, useEffect } from 'react';
import {
  Menu, X, Laptop, User, GraduationCap, MapPin,
  Briefcase, Mail, Github, Linkedin, ExternalLink,
  ArrowUp, Folder, Moon, Sun, Download
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';
import profileImg from './assets/profile.jpg';

// Icons wrapper
const IconWrapper = ({ icon: Icon, className }) => <Icon className={className || "w-6 h-6"} />;

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check local storage or system preference on load
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      if (newMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
      return newMode;
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    { name: 'Home', to: 'home' },
    { name: 'About', to: 'about' },
    { name: 'Education', to: 'education' },
    { name: 'Experience', to: 'experience' },
    { name: 'Skills', to: 'skills' },
    { name: 'Projects', to: 'projects' },
    { name: 'Contact', to: 'contact' },
  ];

  return (
    <div className="relative">
      {/* Header */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'py-4 bg-background/90 backdrop-blur-md shadow-sm border-b border-slate-200' : 'py-6 bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <Link to="home" smooth={true} duration={500} className="text-2xl font-outfit font-bold text-gradient cursor-pointer">
            Adnan Arfansyah.
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                smooth={true}
                spy={true}
                offset={-80}
                duration={500}
                className="nav-link cursor-pointer"
                activeClass="active"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Toggle & Theme */}
          <div className="flex items-center gap-4 md:hidden">
            <button onClick={toggleTheme} className="text-textPrimary hover:text-primary transition-colors focus:outline-none">
              {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
            </button>
            <button
              className="text-textPrimary focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Desktop Theme Toggle */}
          <button onClick={toggleTheme} className="hidden md:flex text-textPrimary hover:text-primary transition-colors focus:outline-none ml-6">
            {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Nav */}
      <div className={`fixed inset-0 bg-background/98 z-40 flex flex-col items-center justify-center transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
        <div className="flex flex-col gap-8 text-center">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.to}
              smooth={true}
              spy={true}
              offset={-80}
              duration={500}
              className="text-2xl font-medium text-textSecondary hover:text-primary transition-colors cursor-pointer"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>

      <main>
        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center pt-20 px-6 md:px-12 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="text-primary font-outfit font-semibold text-lg md:text-xl block mb-4 tracking-wide">
              Hi, my name is
            </span>
            <h1 className="text-5xl md:text-7xl mb-4 text-textPrimary tracking-tight">
              Adnan Arfansyah.
            </h1>

            <h2 className="text-4xl md:text-5xl text-primary mb-6 font-outfit font-bold italic tracking-wider">
              Web Developer
            </h2>
            <div className="text-lg md:text-xl text-textSecondary mb-10 max-w-2xl space-y-4 leading-relaxed">
              <p>
                I am an active student with a strong interest in web development. I am interested in building responsive, user-friendly, and high-performance websites.
              </p>
              <p>
                During my studies, I actively studied and developed my skills in website development, both front-end and back-end. I am familiar with HTML, CSS, JavaScript, and PHP, as well as various frameworks and database management systems.
              </p>
              <p>
                I have a strong learning spirit, am able to work both independently and in a team, and am accustomed to completing projects on time.
              </p>
            </div>
            <div className="flex flex-wrap gap-5">
              <Link to="projects" smooth={true} offset={-80} duration={500} className="btn btn-primary cursor-pointer w-full sm:w-auto flex items-center justify-center">
                <Briefcase size={20} className="mr-2" /> View Projects
              </Link>
              <a href="/Adnan_Arfansyah_CV.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-outline w-full sm:w-auto flex items-center justify-center">
                <Download size={20} className="mr-2" /> Download CV
              </a>
              <a href="mailto:adnanarfansyahwork@gmail.com" className="btn btn-outline w-full sm:w-auto flex items-center justify-center">
                <Mail size={20} className="mr-2" /> Contact Me
              </a>
            </div>
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" className="section-padding px-6 md:px-12 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl text-center mb-16 relative w-fit mx-auto font-outfit">
              About Me
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
            </h2>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="bg-backgroundAlt border border-borderColor shadow-sm rounded-2xl p-2 relative overflow-hidden group hover:border-primary/50 transition-colors duration-300">
                <div className="flex justify-center items-center h-auto aspect-[3/4] relative z-10 rounded-xl overflow-hidden">
                  <img src={profileImg} alt="Adnan Arfansyah" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>

              <div>
                <h3 className="text-2xl mb-4 text-textPrimary font-outfit">A Passion for Problem Solving</h3>
                <p className="text-textSecondary mb-4 text-lg leading-relaxed">
                  I am a Fullstack Developer and Data Enthusiast with a deep curiosity for how technology can bridge human needs and intelligent insights. Currently pursuing my degree at Esa Unggul University, Jakarta.
                </p>
                <p className="text-textSecondary mb-8 text-lg leading-relaxed">
                  My approach combines clean, scalable code with analytical thinking. Whether I'm architecting complex ERP systems or training deep learning models for medical diagnostics, I focus on creating impact through efficiency and high-quality software engineering.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 text-textSecondary">
                    <User className="text-primary w-5 h-5" /> <span>Adnan Arfansyah</span>
                  </div>
                  <div className="flex items-center gap-3 text-textSecondary">
                    <GraduationCap className="text-primary w-5 h-5" /> <span>Informatics Engineering (GPA: 3.60)</span>
                  </div>
                  <div className="flex items-center gap-3 text-textSecondary">
                    <MapPin className="text-primary w-5 h-5" /> <span>Indonesia</span>
                  </div>
                  <div className="flex items-center gap-3 text-textSecondary">
                    <Briefcase className="text-primary w-5 h-5" /> <span>Open for Internship</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Education Section */}
        <section id="education" className="section-padding px-6 md:px-12 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl text-center mb-16 relative w-fit mx-auto font-outfit">
              Education
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  school: 'Universitas Esa Unggul',
                  degree: 'Bachelor of Informatics Engineering',
                  location: 'Jakarta',
                  period: '2023 – present',
                  description: 'Current IPK: 3.60/4.00'
                },
                {
                  school: 'SMA 1 Barunawati',
                  degree: 'Senior High School (IPA)',
                  location: 'Jl. Aipda KS Tubun II/III No.7-13, RT.8/RW.1, Slipi, Kec. Palmerah, Jakarta Barat',
                  period: '2020 – 2023',
                  description: 'Final Score: 77.42'
                },
                {
                  school: 'SMPN 286 Jakarta Barat',
                  degree: 'Junior High School',
                  location: 'Jl. Rawa Kepa VIII No.1, RT.8/RW.12, Tomang, Kec. Grogol Petamburan, Jakarta Barat',
                  period: '2017 – 2020',
                  description: 'Final Score: 80.4'
                },
                {
                  school: 'SDN 08 Pagi',
                  degree: 'Primary School',
                  location: 'Jl. Pulo Macan V No.17, RT.14/RW.5, Tomang, Kec. Grogol Petamburan, Jakarta Barat',
                  period: '2011 – 2017',
                  description: 'Final Score: 22.5'
                }
              ].map((edu, index) => (
                <motion.div
                  key={edu.school}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="bg-backgroundAlt border border-borderColor p-8 rounded-[2rem] hover:border-primary/30 transition-all duration-300 group relative overflow-hidden shadow-sm hover:shadow-xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  <div className="flex justify-between items-start mb-6 relative z-10">
                    <div className="p-4 bg-primary/10 rounded-2xl text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 transform group-hover:rotate-6">
                      <GraduationCap size={28} />
                    </div>
                    <span className="text-sm font-bold text-textSecondary bg-bgBadge px-4 py-1.5 rounded-full border border-borderColor">
                      {edu.period}
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-textPrimary mb-2 font-outfit group-hover:text-primary transition-colors relative z-10">{edu.school}</h3>
                  <p className="text-primary font-semibold mb-4 text-lg relative z-10">{edu.degree}</p>
                  <div className="flex items-center gap-2 text-textSecondary relative z-10">
                    <MapPin size={18} className="text-primary/60" />
                    <span className="text-sm md:text-base leading-snug">{edu.location}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="section-padding px-6 md:px-12 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl text-center mb-16 relative w-fit mx-auto font-outfit">
              Organization Experience
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
            </h2>

            <div className="flex flex-col gap-8">
              <div className="bg-backgroundAlt border border-borderColor shadow-sm rounded-2xl p-8 lg:p-10 relative overflow-hidden group hover:border-primary/30 hover:shadow-md transition-all duration-300">
                <div className="flex flex-col md:flex-row justify-between mb-6">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-textPrimary font-outfit mb-1">Esa Unggul Nature Lovers Student Association (Himpala)</h3>
                    <h4 className="text-primary font-medium text-lg">Organizational Development & Chief Organizer of HEOC</h4>
                  </div>
                  <span className="text-textSecondary mt-2 md:mt-0 font-outfit bg-bgBadge px-4 py-1.5 rounded-full w-fit h-fit text-sm font-semibold">2023 – Present</span>
                </div>
                <ul className="list-disc list-outside ml-5 text-textSecondary space-y-3 md:text-lg">
                  <li>Contributed to organizational development, participant data management, and structured activity reporting.</li>
                  <li>Served as the Chief Organizer for the National Orienteering Competition (HEOC 2025) and environmental programs.
                    <a href="https://aruna9news.com/himpala-universitas-esa-unggul-gelar-heoc-2025-eco-explorer-navigation-recycling-innovation/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center ml-2 border border-primary/30 px-2 py-0.5 rounded text-sm bg-primary/5">
                      News Coverage <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  </li>
                </ul>
                <div className="absolute inset-0 bg-gradient-to-bl from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="section-padding px-6 md:px-12 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl text-center mb-16 relative w-fit mx-auto font-outfit">
              My Skills
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                { name: 'Laravel', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg', color: 'hover:text-[#FF2D20]', border: 'hover:border-[#FF2D20]/50' },
                { name: 'PHP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg', color: 'hover:text-[#777BB4]', border: 'hover:border-[#777BB4]/50' },
                { name: 'HTML', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', color: 'hover:text-[#E34F26]', border: 'hover:border-[#E34F26]/50' },
                { name: 'CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', color: 'hover:text-[#1572B6]', border: 'hover:border-[#1572B6]/50' },
                { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', color: 'hover:text-[#F7DF1E]', border: 'hover:border-[#F7DF1E]/50' },
                { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', color: 'hover:text-[#3776AB]', border: 'hover:border-[#3776AB]/50' },
                { name: 'React.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', color: 'hover:text-[#61DAFB]', border: 'hover:border-[#61DAFB]/50' },
                { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', color: 'hover:text-[#F05032]', border: 'hover:border-[#F05032]/50' },
                { name: 'Machine Learning', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg', color: 'hover:text-[#FF9900]', border: 'hover:border-[#FF9900]/50' },
              ].map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className={`bg-backgroundAlt border border-borderColor shadow-sm rounded-2xl p-8 flex flex-col items-center justify-center gap-5 transition-all duration-500 hover:-translate-y-3 group hover:shadow-xl ${skill.border}`}
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center p-2 rounded-2xl bg-background transition-transform duration-500 group-hover:scale-110">
                    <img src={skill.icon} alt={skill.name} className="w-full h-full object-contain" />
                  </div>
                  <span className={`font-outfit font-bold text-lg md:text-xl text-textPrimary transition-colors duration-300 group-${skill.color.split(':')[1]}`}>
                    {skill.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="section-padding px-6 md:px-12 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl text-center mb-16 relative w-fit mx-auto font-outfit">
              Some Things I've Built
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: 'Hospital Information System',
                  desc: 'Comprehensive Healthcare ERP featuring real-time billing, electronic medical records, and integrated payment gateways for seamless clinical operations.',
                  tech: ['Laravel', 'Fullstack', 'MySQL'],
                  url: 'https://github.com/adnanarfansyahwork-blip/hospital_management'
                },
                {
                  title: 'Himpala Project',
                  desc: 'Production-ready organizational platform streamlining internal workflows, automated scheduling, and real-time reporting for student associations.',
                  tech: ['Laravel', 'Livewire', 'MySQL'],
                  url: 'https://himpala.com/',
                  isExternal: true
                },
                {
                  title: 'Diabetic Foot Ulcer Classification',
                  desc: 'Cutting-edge AI diagnostic tool leveraging MobileNetV2 for medical image classification, achieving 96.7% accuracy in clinical verification.',
                  tech: ['Deep Learning', 'Python', 'Computer Vision'],
                  url: 'https://github.com/adnanarfansyahwork-blip/diabetic-foot-ulcer-classification'
                },
                {
                  title: 'TTS Game',
                  desc: 'Interactive cross-platform SPA featuring a custom-built automatic crossword generator and modern game mechanics inspired by top-tier puzzle games.',
                  tech: ['PHP', 'Laravel', 'React'],
                  url: 'https://github.com/adnanarfansyahwork-blip/TTS-Game'
                }
              ].map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="bg-backgroundAlt border border-borderColor shadow-sm rounded-2xl p-8 flex flex-col h-full transition-all duration-300 hover:-translate-y-2 hover:border-primary/30 hover:shadow-xl group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

                  <div className="flex justify-between items-center mb-6 relative z-10">
                    <Folder className="w-10 h-10 text-primary" />
                    <div className="flex gap-4">
                      <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-textSecondary hover:text-primary transition-colors">
                        {project.isExternal ? <ExternalLink className="w-6 h-6" /> : <Github className="w-6 h-6" />}
                      </a>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-3 text-textPrimary group-hover:text-primary transition-colors font-outfit relative z-10">
                    {project.isExternal ? (
                      <a href={project.url} target="_blank" rel="noopener noreferrer">{project.title}</a>
                    ) : (
                      <RouterLink to={`/project/${project.title.toLowerCase().replace(/ /g, '-')}`}>{project.title}</RouterLink>
                    )}
                  </h3>

                  <p className="text-textSecondary mb-6 flex-grow relative z-10">
                    {project.desc}
                  </p>

                  <div className="flex flex-wrap gap-3 mt-auto relative z-10">
                    {project.tech.map(t => (
                      <span key={t} className="text-xs font-outfit text-textSecondary bg-bgBadge font-semibold px-3 py-1 rounded-full border border-borderColor">
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <a href="https://github.com/adnanarfansyahwork-blip" target="_blank" rel="noopener noreferrer" className="btn btn-outline inline-flex">
                View More on GitHub <Github className="w-5 h-5 ml-2" />
              </a>
            </div>
          </motion.div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="section-padding px-6 md:px-12 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl mb-16 relative w-fit mx-auto font-outfit">
              Get In Touch
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
            </h2>

            <p className="text-textSecondary text-lg mb-12">
              I'm currently looking for new opportunities, and my inbox is always open. Whether you have a question, an internship offer, or just want to say hi, I'll try my best to get back to you!
            </p>

            <div className="flex flex-wrap justify-center gap-6">
              <a href="/Adnan_Arfansyah_CV.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 bg-backgroundAlt border border-borderColor shadow-sm px-8 py-4 rounded-full transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:bg-primary/5 hover:shadow-md text-textPrimary font-semibold group">
                <Download className="w-6 h-6 text-primary" />
                Download CV
              </a>
              <div className="flex items-center gap-4 bg-backgroundAlt border border-borderColor shadow-sm px-8 py-4 rounded-full text-textPrimary font-semibold transition-all duration-300 hover:border-primary/50 group">
                <Mail className="w-6 h-6 text-primary" />
                adnanarfansyahwork@gmail.com
              </div>
              <a href="https://github.com/adnanarfansyahwork-blip" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 bg-backgroundAlt border border-borderColor shadow-sm px-8 py-4 rounded-full transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:bg-primary/5 hover:shadow-md text-textPrimary font-semibold group">
                <Github className="w-6 h-6 text-primary group-hover:text-secondary transition-colors" />
                GitHub
              </a>
            </div>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-borderColor bg-backgroundAlt py-8 text-center px-6">
        <p className="text-textSecondary mb-4">
          &copy; {new Date().getFullYear()} Adnan Arfansyah. Designed & Built with ❤️
        </p>
        <div className="flex justify-center gap-4">
          <a href="https://github.com/adnanarfansyahwork-blip" target="_blank" rel="noopener noreferrer" className="text-textSecondary hover:text-primary transition-colors">
            <Github className="w-5 h-5" />
          </a>
        </div>
      </footer>

      {/* Scroll Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-50 p-3 rounded-full bg-gradient-to-br from-primary to-secondary text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_6px_20px_rgba(6,182,212,0.5)] ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
      >
        <ArrowUp className="w-6 h-6" />
      </button>
    </div>
  );
}

export default App;
