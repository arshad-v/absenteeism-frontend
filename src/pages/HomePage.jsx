import React from 'react';
import { motion } from 'framer-motion';

const API_URL = 'http://127.0.0.1:5000';

const HomePage = () => {
  const analyticsImages = [
    { name: 'Age Distribution', filename: 'age_distribution.png' },
    { name: 'Correlation Heatmap', filename: 'correlation_heatmap.png' },
    { name: 'Cluster Distribution', filename: 'cluster_distribution.png' },
    { name: 'Age vs AbsentHours Scatter', filename: 'cluster_scatter.png' },
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
        {analyticsImages.map((image) => (
          <motion.div
            key={image.name}
            className="eda-image"
            variants={itemVariants}
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
          >
            <h3>{image.name}</h3>
            <img src={`${API_URL}/static/images/${image.filename}`} alt={image.name} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default HomePage;
