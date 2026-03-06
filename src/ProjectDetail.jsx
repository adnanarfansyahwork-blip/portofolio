import React, { useState, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { ArrowLeft, Github, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

const projectData = {
    'hospital-information-system': {
        title: 'Hospital Information System',
        description: 'A comprehensive web-based Hospital Management System built with Laravel and Tailwind CSS, featuring patient management, billing, and real-time queues.',
        githubBaseUrl: 'https://raw.githubusercontent.com/adnanarfansyahwork-blip/hospital_management/main',
        readmeUrl: 'https://raw.githubusercontent.com/adnanarfansyahwork-blip/hospital_management/main/README.md',
        repoUrl: 'https://github.com/adnanarfansyahwork-blip/hospital_management'
    },
    'himpala-project': {
        title: 'Himpala Project',
        description: 'Internal organizational management system for Himpala Esa Unggul, featuring role-based access, dashboards, and automated scheduling.',
        githubBaseUrl: 'https://raw.githubusercontent.com/adnanarfansyahwork-blip/himpala/main',
        readmeUrl: 'https://raw.githubusercontent.com/adnanarfansyahwork-blip/himpala/main/README.md',
        repoUrl: 'https://github.com/adnanarfansyahwork-blip/himpala'
    },
    'diabetic-foot-ulcer-classification': {
        title: 'Diabetic Foot Ulcer Classification',
        description: 'Advanced classification system for diabetic foot ulcers using deep learning architectures for high-precision diagnostic support.',
        githubBaseUrl: 'https://raw.githubusercontent.com/adnanarfansyahwork-blip/diabetic-foot-ulcer-classification/main',
        readmeUrl: 'https://raw.githubusercontent.com/adnanarfansyahwork-blip/diabetic-foot-ulcer-classification/main/README.md',
        repoUrl: 'https://github.com/adnanarfansyahwork-blip/diabetic-foot-ulcer-classification'
    },
    'tts-game': {
        title: 'TTS Game',
        description: 'A classic Tic-Tac-Toe game implementation with a robust backend architecture and interactive gameplay features.',
        githubBaseUrl: 'https://raw.githubusercontent.com/adnanarfansyahwork-blip/TTS-Game/main',
        readmeUrl: 'https://raw.githubusercontent.com/adnanarfansyahwork-blip/TTS-Game/main/README.md',
        repoUrl: 'https://github.com/adnanarfansyahwork-blip/TTS-Game'
    }
};


const ProjectDetail = () => {
    const { id } = useParams();
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const project = projectData[id];

    useEffect(() => {
        window.scrollTo(0, 0);

        if (!project) {
            setError('Project not found');
            setLoading(false);
            return;
        }

        // Set SEO Metadata
        document.title = `${project.title} | Adnan Arfansyah Portfolio`;
        let metaDesc = document.querySelector('meta[name="description"]');
        if (!metaDesc) {
            metaDesc = document.createElement('meta');
            metaDesc.name = 'description';
            document.head.appendChild(metaDesc);
        }
        metaDesc.setAttribute('content', project.description);

        const fetchReadme = async () => {
            try {
                const response = await fetch(project.readmeUrl);
                if (!response.ok) {
                    throw new Error('Failed to fetch README');
                }
                let text = await response.text();

                // Basic rewrite of relative image paths in markdown to absolute github paths
                text = text.replace(/!\[([^\]]*)\]\(((?!http)[^\)]+)\)/g, (match, p1, p2) => {
                    const cleanPath = p2.startsWith('/') ? p2.substring(1) : p2;
                    return `![${p1}](${project.githubBaseUrl}/${cleanPath})`;
                });

                // Also rewrite raw HTML img tags with relative src
                text = text.replace(/<img[^>]+src="((?!http)[^"]+)"[^>]*>/g, (match, p1) => {
                    const cleanPath = p1.startsWith('/') ? p1.substring(1) : p1;
                    return match.replace(p1, `${project.githubBaseUrl}/${cleanPath}`);
                });


                // Remove emojis/icons from content for a cleaner look
                text = text.replace(/[\u{1F300}-\u{1F9FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '');

                setContent(text);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching README:", err);
                setError('Could not load project details. Please try again later.');
                setLoading(false);
            }
        };

        fetchReadme();
    }, [id, project]);

    if (!project) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-md bg-backgroundAlt p-10 rounded-3xl border border-borderColor shadow-2xl"
                >
                    <h1 className="text-5xl font-bold text-textPrimary mb-6 font-outfit">Oops!</h1>
                    <p className="text-textSecondary mb-8 text-lg">Project not found or has been moved.</p>
                    <RouterLink to="/" className="btn btn-primary w-full">
                        <ArrowLeft size={20} /> Back to Portfolio
                    </RouterLink>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background pt-0">
            {/* Hero Section */}
            <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
                {/* Dynamic Background */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20 z-10" />
                    <motion.div
                        animate={{
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, 0]
                        }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_50%_50%,rgba(14,165,233,0.1),transparent_50%)]"
                    />
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-20 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <RouterLink to="/" className="inline-flex items-center gap-2 text-primary hover:text-secondary transition-all font-semibold mb-8 group bg-primary/10 px-4 py-2 rounded-full border border-primary/20 backdrop-blur-sm">
                            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                            Back to Portfolio
                        </RouterLink>

                        <h1 className="text-5xl md:text-8xl font-black text-textPrimary mb-8 font-outfit tracking-tight leading-tight">
                            {project.title}
                        </h1>

                        <div className="flex flex-wrap justify-center gap-4 mt-10">
                            {project.repoUrl && (
                                <a
                                    href={project.repoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-primary px-8"
                                >
                                    <Github size={20} /> View Source Code
                                </a>
                            )}
                            <a href="#details" className="btn btn-outline px-8 bg-background/50 backdrop-blur-md">
                                Explore Details
                            </a>
                        </div>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 text-textSecondary opacity-50"
                >
                    <div className="w-6 h-10 border-2 border-textSecondary rounded-full flex justify-center p-1">
                        <div className="w-1 h-2 bg-textSecondary rounded-full" />
                    </div>
                </motion.div>
            </section>

            {/* Content Section */}
            <div id="details" className="max-w-7xl mx-auto px-6 py-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Main Content */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="lg:col-span-12"
                    >
                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-40">
                                <div className="w-20 h-20 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-8"></div>
                                <p className="text-2xl text-textSecondary font-outfit font-medium animate-pulse">Fetching documentation...</p>
                            </div>
                        ) : error ? (
                            <div className="text-center py-40 bg-backgroundAlt rounded-3xl border border-borderColor p-12 shadow-xl">
                                <p className="text-2xl text-red-500 mb-8 font-outfit font-bold">{error}</p>
                                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                                    View on GitHub <ExternalLink size={20} />
                                </a>
                            </div>
                        ) : (
                            <div className="bg-backgroundAlt border border-borderColor rounded-[3rem] p-8 md:p-16 lg:p-20 shadow-2xl relative overflow-hidden">
                                {/* Aesthetic side glow */}
                                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[120px] -z-10 rounded-full" />
                                <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 blur-[120px] -z-10 rounded-full" />

                                <article className="prose prose-xl md:prose-2xl prose-slate dark:prose-invert max-w-4xl mx-auto
                                    prose-headings:font-outfit prose-headings:font-black prose-headings:tracking-tight prose-headings:text-textPrimary
                                    prose-h1:text-5xl md:prose-h1:text-6xl prose-h1:mb-12 prose-h1:mt-0
                                    prose-h2:text-4xl md:prose-h2:text-5xl prose-h2:mt-20 prose-h2:mb-8
                                    prose-h3:text-2xl md:prose-h3:text-3xl prose-h3:mt-12
                                    prose-p:text-textSecondary prose-p:leading-relaxed prose-p:text-lg md:prose-p:text-xl
                                    prose-a:text-primary prose-a:font-bold hover:prose-a:text-secondary prose-a:no-underline hover:prose-a:underline
                                    prose-img:rounded-3xl prose-img:shadow-2xl prose-img:mx-auto prose-img:my-10 md:prose-img:max-w-[100%]
                                    prose-strong:text-textPrimary prose-strong:font-bold
                                    prose-code:text-primary prose-code:bg-primary/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-medium prose-code:before:content-none prose-code:after:content-none
                                    prose-pre:bg-slate-900 prose-pre:rounded-2xl prose-pre:shadow-xl prose-pre:p-6 md:prose-pre:p-10
                                    prose-ul:text-textSecondary prose-li:my-3 prose-li:text-lg md:prose-li:text-xl
                                    prose-blockquote:border-l-8 prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:py-6 prose-blockquote:px-10 prose-blockquote:rounded-r-2xl prose-blockquote:italic prose-blockquote:text-textPrimary md:prose-blockquote:text-2xl
                                    w-full text-left">
                                    <ReactMarkdown
                                        remarkPlugins={[remarkGfm]}
                                        rehypePlugins={[rehypeRaw]}
                                        components={{
                                            // Demote H1 to H2 to avoid duplicate H1 for SEO
                                            h1: ({ node, ...props }) => <h2 className="text-4xl md:text-5xl font-black mt-20 mb-8 font-outfit tracking-tight" {...props} />,
                                            // Ensure H2-H4 are styled correctly
                                            h2: ({ node, ...props }) => <h2 className="text-4xl md:text-5xl font-black mt-20 mb-8 font-outfit tracking-tight" {...props} />,
                                            h3: ({ node, ...props }) => <h3 className="text-2xl md:text-3xl font-bold mt-12 mb-6 font-outfit" {...props} />,
                                            h4: ({ node, ...props }) => <h4 className="text-xl md:text-2xl font-bold mt-8 mb-4 font-outfit" {...props} />,
                                        }}
                                    >
                                        {content}
                                    </ReactMarkdown>
                                </article>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>

            {/* CTA Footer */}
            {!loading && !error && (
                <section className="py-24 px-6">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-4xl md:text-5xl font-outfit font-black text-textPrimary mb-8">Ready to check the code?</h2>
                        <div className="flex flex-col sm:flex-row justify-center gap-6">
                            <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary px-10 py-5 text-xl">
                                <Github size={24} /> Star on GitHub
                            </a>
                            <RouterLink to="/" className="btn btn-outline px-10 py-5 text-xl">
                                Back to All Projects
                            </RouterLink>
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};

export default ProjectDetail;

