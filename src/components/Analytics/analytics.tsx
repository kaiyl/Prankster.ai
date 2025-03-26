import React, { useState } from 'react';
import styles from './analytics.module.css';

interface AnalyticsProps {
  timeFrame: string;
  setTimeFrame: (frame: string) => void;
}

interface BestPrank {
  title: string;
  creator: string;
  likes: number;
  views: number;
}

const Analytics: React.FC<AnalyticsProps> = ({ timeFrame, setTimeFrame }) => {
  const [bestPrank] = useState<BestPrank>({
    title: 'Sending Dwight faxes from himself, from the future.',
    creator: 'Jim Halpert',
    likes: 438,
    views: 593,
  });

  const timeFrames = ['This Month', 'Last Month', 'All Time'];

  const handleTimeFrameChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTimeFrame(event.target.value);
  };

  return (
    <div className={styles.analytics}>
      <div className={styles.title}>
        <h2>Your Prankster Analytics Dashboard</h2>
      </div>

      <div className={styles.timeFrameSelector}>
        <label className={styles.label}>Time Frame:</label>
        <select 
          className={styles.select}
          value={timeFrame} 
          onChange={handleTimeFrameChange}
        >
          {timeFrames.map((frame) => (
            <option key={frame} value={frame}>{frame}</option>
          ))}
        </select>
      </div>

      <div className={styles.content}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.header}>Metric</th>
              <th className={styles.header}>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr className={styles.row}>
              <td className={styles.cell}>Total Pranks</td>
              <td className={styles.cell}>22</td>
            </tr>
            <tr className={styles.row}>
              <td className={styles.cell}>Total Likes</td>
              <td className={styles.cell}>890</td>
            </tr>
            <tr className={styles.row}>
              <td className={styles.cell}>Total Views</td>
              <td className={styles.cell}>1324</td>
            </tr>
          </tbody>
        </table>

        <div className={styles.bestPrank}>
          <h3 className={styles.sectionTitle}>Best Prank</h3>
          <div className={styles.prankContent}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <img 
                src="/images/StaticPosts/fax.png" 
                alt="Prank Fax" 
                style={{ 
                  width: '150px',
                  height: 'auto',
                  borderRadius: '4px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  marginBottom: '1rem'
                }}
              />
              <div>
                <p className={styles.prankTitle}>{bestPrank.title}</p>
                <p className={styles.prankDescription}>
                  "Dwight, at 8am today, someone poisons the coffee... more instructions will follow"
                </p>
                <p><strong>Likes:</strong> {bestPrank.likes}</p>
                <p><strong>Views:</strong> {bestPrank.views}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;