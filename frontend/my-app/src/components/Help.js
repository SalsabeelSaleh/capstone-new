import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext"; // For language state
import { useNavigate } from "react-router-dom";       // To navigate to other routes
import "./LoginPage.css"; // Reusing styles from LoginPage
import "./Help.css"; // Adding Help-specific styles                                  // Help page specific styles

export default function Help() {
  const { language, toggleLanguage } = useContext(AuthContext); // Get language and toggle
  const navigate = useNavigate(); // Hook to navigate between pages

  return (
    <div className={language === "ar" ? "rtl" : "ltr"}>
      {/* === HEADER === */}
      <header className={`login-header ${language === "ar" ? "rtl" : "ltr"}`}>
        <h1 className="login-title1">
          {language === "en" ? "Abber" : "عَبِّرْ"}
        </h1>

        {/* Language toggle button */}
        <button className="login-language-switch" onClick={toggleLanguage}>
          {language === "en" ? "العربية" : "English"}
        </button>
      </header>

      {/* === MAIN HELP CONTENT === */}
      <div className="help-container">
        <div
          className="help-content"
          style={{
            textAlign: language === "ar" ? "right" : "left",
            direction: language === "ar" ? "rtl" : "ltr",
          }}
        >
          <h1 className="help-title">
            {language === "en" ? "Help & Support" : "المساعدة والدعم"}
          </h1>

          {/* 1. Introduction */}
          <section className="help-section">
            <h2>{language === "en" ? "1. Introduction" : "1. المقدمة"}</h2>
            <p>
              {language === "en"
                ? "This website provides facial emotion detection to help children with autism recognize emotions and improve social interactions. It works in real-time and requires a camera."
                : "يوفر هذا الموقع اكتشاف المشاعر الوجهية لمساعدة الأطفال المصابين بالتوحد على التعرف على العواطف وتحسين التفاعلات الاجتماعية. يعمل في الوقت الفعلي ويتطلب كاميرا."}
            </p>
            <p>
              {language === "en"
                ? "It is designed for children, parents, and educators."
                : "تم تصميمه للأطفال والآباء والمعلمين."}
            </p>
          </section>

          {/* 2. How to Use */}
          <section className="help-section">
            <h2>{language === "en" ? "2. How to Use the Website" : "2. كيفية استخدام الموقع"}</h2>

            {/* A. Creating an Account */}
            <h3>{language === "en" ? "A. Creating an Account" : "أ. إنشاء حساب"}</h3>
            <ol>
              <li>{language === "en" ? "Click on 'Get Started' on the homepage." : "اضغط على 'ابدأ' في الصفحة الرئيسية."}</li>
              <li>{language === "en" ? "Enter your username and password." : "أدخل اسم المستخدم وكلمة المرور."}</li>
              <li>{language === "en" ? "Choose an avatar that represents you." : "اختر صورة رمزية تمثلك."}</li>
              <li>{language === "en" ? "Click 'Continue' to complete the setup." : "اضغط على 'استمرار' لإتمام الإعداد."}</li>
              <li>{language === "en" ? "If you already have an account, click 'Login' instead." : "إذا كان لديك حساب بالفعل، اضغط على 'تسجيل الدخول' بدلاً من ذلك."}</li>
            </ol>

            {/* B. Navigation guide */}
            <h3>{language === "en" ? "B. Navigating the Website" : "ب. التنقل في الموقع"}</h3>
            <ul>
              <li>{language === "en" ? "Home Page → Introduction to the website." : "الصفحة الرئيسية ← مقدمة عن الموقع."}</li>
              <li>{language === "en" ? "Emotion Detection Page → The main tool to analyze emotions." : "صفحة اكتشاف المشاعر ← الأداة الرئيسية لتحليل المشاعر."}</li>
              <li>{language === "en" ? "Profile Page → Manage your account details and avatar." : "صفحة الملف الشخصي ← إدارة تفاصيل الحساب والصورة الرمزية."}</li>
              <li>{language === "en" ? "Help Page → Instructions on how to use the website." : "صفحة المساعدة ← تعليمات حول كيفية استخدام الموقع."}</li>
              <li>{language === "en" ? "About Page → Information about the system and our mission." : "صفحة حول ← معلومات عن النظام ومهمتنا."}</li>
            </ul>
          </section>

          {/* 3. Understanding Results */}
          <section className="help-section">
            <h2>{language === "en" ? "3. Understanding the Results" : "3. فهم النتائج"}</h2>
            <ul>
              <li>{language === "en" ? "Happy 😊 → The person is feeling positive." : "سعيد 😊 ← الشخص يشعر بالإيجابية."}</li>
              <li>{language === "en" ? "Sad 😔 → The person may need comfort." : "حزين 😔 ← الشخص قد يحتاج إلى الراحة."}</li>
              <li>{language === "en" ? "Angry 😡 → The person is upset; be calm." : "غاضب 😡 ← الشخص غاضب؛ كن هادئًا."}</li>
              <li>{language === "en" ? "Neutral 😐 → No strong emotions detected." : "محايد 😐 ← لم يتم اكتشاف مشاعر قوية."}</li>
              <li>{language === "en" ? "Surprised 😲 → Something unexpected happened." : "مفاجأ 😲 ← حدث شيء غير متوقع."}</li>
              <li>{language === "en" ? "Fear 😨 → The person may be scared." : "خوف 😨 ← الشخص قد يكون خائفًا."}</li>
              <li>{language === "en" ? "Disgust 🤢 → The person dislikes something." : "اشمئزاز 🤢 ← الشخص لا يحب شيء."}</li>
            </ul>
          </section>

          {/* 4. Troubleshooting */}
          <section className="help-section">
            <h2>{language === "en" ? "4. Troubleshooting & Common Issues" : "4. استكشاف الأخطاء وإصلاحها والمشاكل الشائعة"}</h2>

            {/* A. Camera issues */}
            <h3>{language === "en" ? "A. Camera Not Working?" : "أ. الكاميرا لا تعمل؟"}</h3>
            <ul>
              <li>{language === "en" ? "Ensure you have allowed camera access." : "تأكد من أنك قد سمحت بالوصول إلى الكاميرا."}</li>
              <li>{language === "en" ? "Refresh the page or restart your browser." : "قم بتحديث الصفحة أو إعادة تشغيل المتصفح."}</li>
              <li>{language === "en" ? "Try a different browser (Google Chrome, Edge, etc.)." : "جرب متصفحًا مختلفًا (جوجل كروم، إيدج، إلخ)."}</li>
            </ul>

            {/* B. Internet */}
            <h3>{language === "en" ? "B. Ensure Good Internet Connection" : "ب. تأكد من الاتصال الجيد بالإنترنت"}</h3>
            <ul>
              <li>{language === "en" ? "A stable internet connection is necessary for accurate emotion detection." : "اتصال إنترنت مستقر ضروري للكشف الدقيق عن المشاعر."}</li>
              <li>{language === "en" ? "Slow internet may affect the speed of the system's response and the accuracy of results." : "قد يؤثر الإنترنت البطيء على سرعة استجابة النظام ودقة النتائج."}</li>
            </ul>
          </section>

          {/* Back Button */}
          <button className="help-button primary" onClick={() => navigate("/main-page")}>
            {language === "en" ? "Back to Home" : "العودة إلى الرئيسية"}
          </button>
        </div>
      </div>
    </div>
  );
}
