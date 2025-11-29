import React from 'react';
import '@/style/legal-pages.css';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'הצהרת נגישות - המעיין הנובע',
  description: 'הצהרת נגישות של אתר המעיין הנובע',
};

const AccessibilityPage = () => {
  return (
    <main className="legal-container">
      <Link href="/" className="back-link">
        ← חזרה למפה
      </Link>

      <header className="legal-header">
        <h1 className="legal-title">הצהרת נגישות</h1>
        <p className="legal-update-date">עדכון אחרון: נובמבר 2025</p>
      </header>

      <div className="legal-content">
        <p className="legal-intro">
          אנו באתר "המעיין הנובע" רואים חשיבות עליונה במתן שירות שוויוני לכלל הגולשים ובשיפור השירות הניתן לגולשים עם מוגבלות.
          אנו משקיעים משאבים רבים בהנגשת האתר והתכנים שבו, במטרה להקל את השימוש בו עבור אנשים עם מוגבלויות, מתוך אמונה כי לכל אדם מגיעה הזכות לחיות בשוויון, כבוד, נוחות ועצמאות.
        </p>

        <section className="legal-section">
          <h2 className="legal-section-title">רמת הנגישות באתר</h2>
          <p className="legal-text">
            האתר הותאם לדרישות תקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), התשע"ג 2013.
            התאמות הנגישות בוצעו עפ"י המלצות התקן הישראלי (ת"י 5568) לנגישות תכנים באינטרנט ברמת AA ומסמך WCAG 2.1 הבינלאומי.
          </p>
        </section>

        <section className="legal-section">
          <h2 className="legal-section-title">הסדרי נגישות פיזיים</h2>
          <p className="legal-text">
            אתר "המעיין הנובע" הינו אתר אינטרנט המספק מידע דיגיטלי בלבד ואין לו קבלת קהל פיזית.
          </p>
        </section>

        <section className="legal-section">
          <h2 className="legal-section-title">כיצד עובדת ההנגשה באתר?</h2>
          <p className="legal-text">
            באתר מוטמע רכיב נגישות של חברת EqualWeb. לחיצה על תפריט הנגישות (אייקון בצד המסך) מאפשרת פתיחת כפתורי ההנגשה. לאחר בחירת נושא בתפריט יש להמתין לטעינת הדף.
          </p>
          <p className="legal-text">
            האתר מספק תמיכה בדפוס השימוש המקובל להפעלה עם מקלדת בעזרת מקשי החצים, Enter ו- Tab ליציאה מתפריטים וחלונות.
            האתר נבדק בדפדפנים הנפוצים: Chrome ו-Firefox.
          </p>
        </section>

        <section className="legal-section">
          <h2 className="legal-section-title">אפשרויות הנגישות בתפריט</h2>
          <ul className="legal-list">
            <li className="legal-list-item">
              <span className="legal-strong">ניווט מקלדת:</span> אפשרות לניווט מלא באתר ללא עכבר.
            </li>
            <li className="legal-list-item">
              <span className="legal-strong">קורא מסך:</span> התאמת האתר עבור טכנולוגיות מסייעות (כגון NVDA, JAWS).
            </li>
            <li className="legal-list-item">
              <span className="legal-strong">חסימת הבהובים:</span> עצירת אלמנטים נעים וחסימת הבהובים למניעת התקפים אפילפטיים.
            </li>
            <li className="legal-list-item">
              <span className="legal-strong">התאמות פונט:</span> הגדלת פונט האתר למספר גדלים שונים ושינוי לפונט קריא יותר (כגון אריאל).
            </li>
            <li className="legal-list-item">
              <span className="legal-strong">ניגודיות צבעים:</span> שינוי ניגודיות לרקע כהה/בהיר, מונוכרום, והיפוך צבעים.
            </li>
            <li className="legal-list-item">
              <span className="legal-strong">עיוורי צבעים:</span> התאמת גוונים לאנשים עם עיוורון צבעים.
            </li>
            <li className="legal-list-item">
              <span className="legal-strong">סמן עכבר:</span> הגדלת הסמן ושינוי צבעו לשחור או לבן.
            </li>
            <li className="legal-list-item">
              <span className="legal-strong">הגדלת תצוגה:</span> זכוכית מגדלת והגדלת התצוגה לכ-200%.
            </li>
            <li className="legal-list-item">
              <span className="legal-strong">הדגשות:</span> הדגשת קישורים וכותרות באופן ויזואלי ברור.
            </li>
            <li className="legal-list-item">
              <span className="legal-strong">תיאור תמונות:</span> הצגת טקסט אלטרנטיבי (Alt Text) לתמונות.
            </li>
          </ul>
        </section>

        <section className="legal-section">
          <h2 className="legal-section-title">סייג לנגישות</h2>
          <p className="legal-text">
            למרות מאמצינו הרבים לאפשר גלישה נגישה בכל דפי האתר, ייתכן ויתגלו דפים או חלקים באתר שטרם הונגשו במלואם או שטרם נמצא הפתרון הטכנולוגי המתאים להנגשתם (בפרט מסמכים חיצוניים או תמונות המועלות על ידי גולשים).
            אנו ממשיכים במאמצים לשפר את נגישות האתר כחלק ממחויבותנו המוסרית לאפשר שימוש בו לכלל האוכלוסייה, לרבות אנשים עם מוגבלויות.
          </p>
        </section>

        <section className="legal-section">
          <h2 className="legal-section-title">פרטי רכז הנגישות ודרכי פנייה</h2>
          <p className="legal-text">
            אם במהלך הגלישה באתר נתקלתם בקושי בנושא נגישות, או שיש לכם הערה או הצעה לשיפור, נשמח לשמוע מכם. פנייתכם תטופל בהקדם האפשרי על ידי רכז הנגישות שלנו.
          </p>
          <p className="legal-text">
            <span className="legal-strong">פרטי רכז הנגישות:</span><br />
            שם: אלעד<br />
            טלפון: <a href="tel:0527282122">052-7282122</a> (ניתן לפנות גם ב-SMS/וואטסאפ)<br />
            דואר אלקטרוני: <a href="mailto:thefountainisrael@gmail.com">thefountainisrael@gmail.com</a>
          </p>
        </section>
      </div>
    </main>
  );
};

export default AccessibilityPage;
