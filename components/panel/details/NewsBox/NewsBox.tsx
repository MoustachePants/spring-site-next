import React from 'react';
import './NewsBox.css';
import Icons from '@/style/icons';

const NewsBox: React.FC = () => {
  return (
    <section className="news-box-container">
      <section className="news-title-section">
        <div className="icon-wrapper">
          <Icons.updates width={50} height={50} strokeWidth={1.5} />
        </div>
        <h3>
          עדכונים
          <br />
          מהשטח
        </h3>
      </section>

      <section className="news-content">
        <button className="nav-button prev">
          <Icons.prev />
        </button>

        <div className="news-text-content">
          <p className="quote">"dsdds dsds. dsפגשתי את אלעד במעיין והתרחצנו בירדן"</p>
          <p className="author">רועי פורת</p>

          <button className="action-button">ביקרת פה? נשמח לעדכון מהשטח :)</button>
        </div>

        <button className="nav-button next">
          <Icons.next />
        </button>
      </section>
    </section>
  );
};

export default NewsBox;
