import React from 'react';

const TermsPrivacy = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 text-neutral-200 bg-[#121212] min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Terms of Service & Privacy Policy</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Terms of Service</h2>
        <p>Effective Date: [Insert Date]</p>
        <p>
          Welcome to Movieo, your go-to platform for streaming movies and TV shows. By using our service, you agree to these Terms:
        </p>
        <ol className="list-decimal list-inside space-y-2 mt-4">
          <li><strong>Eligibility:</strong> You must be at least 18 years old or have parental consent to use our service.</li>
          <li><strong>Account:</strong> You may need to create an account. Keep your login details secure.</li>
          <li><strong>Subscription & Payments:</strong> If applicable, subscription fees and payment terms apply as outlined on the site.</li>
          <li><strong>Content Use:</strong> Content is for personal, non-commercial viewing only. Redistribution or unauthorized copying is prohibited.</li>
          <li><strong>User Conduct:</strong> Do not use our platform for illegal activities or harm others.</li>
          <li><strong>Intellectual Property:</strong> All content and materials are owned or licensed by Movieo.</li>
          <li><strong>Disclaimer & Limitation:</strong> Movieo provides content "as is" and does not guarantee uninterrupted access or error-free service.</li>
          <li><strong>Termination:</strong> We reserve the right to suspend or terminate accounts for violations.</li>
          <li><strong>Changes:</strong> We may update these Terms; changes will be posted on this page.</li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Privacy Policy</h2>
        <p>Your privacy matters to us. This policy explains how we collect, use, and protect your information:</p>
        <ol className="list-decimal list-inside space-y-2 mt-4">
          <li><strong>Information We Collect:</strong> Account info (email, name), payment details if applicable, usage data like watched titles, search history, device info.</li>
          <li><strong>Cookies & Tracking:</strong> We use cookies and similar tech to improve your experience and for analytics.</li>
          <li><strong>Use of Data:</strong> We use your data to provide streaming services, personalize recommendations, communicate updates, and improve our platform.</li>
          <li><strong>Data Sharing:</strong> We do not sell your personal info. Data may be shared with trusted third-party services only for operational purposes.</li>
          <li><strong>Security:</strong> We use reasonable measures to protect your data but cannot guarantee complete security.</li>
          <li><strong>Your Rights:</strong> You can access, update, or delete your personal info by contacting us.</li>
          <li><strong>Children’s Privacy:</strong> Our service is not directed to children under 13.</li>
        </ol>
      </section>
    </div>
  );
};

export default TermsPrivacy;
