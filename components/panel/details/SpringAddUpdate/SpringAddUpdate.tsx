import React, { useState } from 'react';
import { Sparks } from 'iconoir-react';
import './SpringAddUpdate.css';
import addSpringUpdate from '@/app/actions/addSpringUpdate';
import toast from 'react-hot-toast';
import Icons from '@/style/icons';

type SpringAddUpdateProps = {
  springId: string;
  onClose: () => void;
};

const SpringAddUpdate: React.FunctionComponent<SpringAddUpdateProps> = ({ springId, onClose }) => {
  const [waterStatus, setWaterStatus] = useState<number | null>(1);
  const [cleanliness, setCleanliness] = useState<number | null>(1);
  const [updateText, setUpdateText] = useState('');
  const [userName, setUserName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mapping constants
  // Water: 1=Yes, 0=No, 2=Contaminated
  // Cleanliness: 1=Clean, 0=Dirty, 2=Filthy

  const handleSubmit = async () => {
    if (waterStatus === null || cleanliness === null) {
      toast.error('אנא מלא את כל שדות החובה');
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        springId,
        waterStatus,
        cleanliness,
        update: updateText,
        user: userName,
      };
      
      const response = await addSpringUpdate(payload);

      if (response.status === 'success') {
        toast.success('העדכון התקבל בהצלחה!');
        // Reset form
        setUpdateText('');
        setUserName('');
        setWaterStatus(1);
        setCleanliness(1);
        onClose();
      } else {
        toast.error('שגיאה בשליחת העדכון');
      }
    } catch (error) {
      toast.error('שגיאה לא צפויה');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="spring-add-update-container">
      <button className="close-button" onClick={onClose}>
        <Icons.close />
      </button>
      <div className="title-section">
        <h3>
          נשמח לשמוע
          <br />
          איך היה לך הביקור :)
        </h3>
        <Sparks className="sparkles-icon" width={24} height={24} />
      </div>

      <div className="status-section">
        <p className="status-label">יש מים במקום?</p>
        <div className="toggle-group">
          <button
            className={`toggle-button ${waterStatus === 1 ? 'active' : ''}`}
            onClick={() => setWaterStatus(1)}
          >
            יש מים
          </button>
          <button
            className={`toggle-button ${waterStatus === 0 ? 'active' : ''}`}
            onClick={() => setWaterStatus(0)}
          >
            אין מים
          </button>
          <button
            className={`toggle-button ${waterStatus === 2 ? 'active' : ''}`}
            onClick={() => setWaterStatus(2)}
          >
            מים מזוהמים
          </button>
        </div>
      </div>

      <div className="status-section">
        <p className="status-label">האם המקום נקי?</p>
        <div className="toggle-group">
          <button
            className={`toggle-button ${cleanliness === 1 ? 'active' : ''}`}
            onClick={() => setCleanliness(1)}
          >
            נקי
          </button>
          <button
            className={`toggle-button ${cleanliness === 0 ? 'active' : ''}`}
            onClick={() => setCleanliness(0)}
          >
            מלוכלך
          </button>
          <button
            className={`toggle-button ${cleanliness === 2 ? 'active' : ''}`}
            onClick={() => setCleanliness(2)}
          >
            מטונף
          </button>
        </div>
      </div>

      <div className="divider" />

      <div className="input-section">
        <label className="input-label">
          יש לך משהו להוסיף? <span>(לא חובה)</span>
        </label>
        <input
          type="text"
          className="text-input"
          placeholder="כאן מפרטים..."
          value={updateText}
          onChange={(e) => setUpdateText(e.target.value)}
        />
      </div>

      <div className="input-section">
        <label className="input-label">
          מה השם שלך? <span>(לא חובה)</span>
        </label>
        <input
          type="text"
          className="text-input"
          placeholder="כאן מפרטים..."
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>

      <button 
        className="submit-button" 
        onClick={handleSubmit} 
        disabled={isSubmitting}
        style={{ opacity: isSubmitting ? 0.7 : 1 }}
      >
        {isSubmitting ? 'שולח...' : 'שליחה עדכון מהשטח'}
      </button>
    </div>
  );
};


export default SpringAddUpdate;
