import React from 'react';
import { motion } from 'framer-motion';

const HomePage = () => {
  const analyticsImages = [
    { src: './images/age_distribution.png', alt: 'Age Distribution' },
    { src: './images/correlation_heatmap.png', alt: 'Correlation Heatmap' },
    { src: './images/cluster_distribution.png', alt: 'Cluster Distribution' },
    { src: './images/cluster_scatter.png', alt: 'Cluster Scatter Plot' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <section>
      <h2>Analytics Dashboard</h2>
      <motion.div
        className="eda-grid"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {analyticsImages.map((image, index) => (
          <motion.div
            key={index}
            className="eda-image"
            variants={itemVariants}
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
          >
            <h3>{image.alt}</h3>
            <img src={image.src} alt={image.alt} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default HomePage;
