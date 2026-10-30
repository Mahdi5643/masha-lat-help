export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { message } = req.body;
        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        const apiKey = process.env.GEMINI_API_KEY;

        // 1. Automatically fetch the live website HTML from GitHub Pages
        let websiteContent = "محتوای سایت در دسترس نیست.";
        try {
            const siteResponse = await fetch('https://mahdi5643.github.io/masha-lat-help/');
            if (siteResponse.ok) {
                const htmlText = await siteResponse.text();
                // Strip HTML tags and clean up spacing to give clean text to the AI
                websiteContent = htmlText.replace(/<[^>]*>?/gm, ' ').replace(/\s+/g, ' ').trim();
            }
        } catch (e) {
            console.error("Could not fetch live site content:", e);
        }

        // 2. Flexible System Prompt: Knows the live site AND can answer general questions
        const systemPrompt = `تو دستیار هوش مصنوعی، باهوش و صمیمی سایت «راهنمای مشَ لات» هستی. «مشَ لات» یک نسخه شخصی‌سازی شده و طنز از بازی موبایلی پو (Pou) به زبان فارسی ترکی است.

        قوانین رفتار و پاسخ‌دهی:
        1. در زیر، متن کاملاً زنده و به‌روز وب‌سایت «راهنمای مشَ لات» قرار دارد. اگر کاربر سوالی درباره بازی، بخش‌ها، مشکلات، تنظیمات یا اکانت پرسید، اطلاعات دقیق آن را از همین متن استخراج کن و به او پاسخ بده:
        --- شروع محتوای زنده سایت ---
        ${websiteContent}
        --- پایان محتوای زنده سایت ---

        2. آزادی در پاسخ به سوالات متفرقه: اگر کاربر سوالی پرسید که ربطی به سایت نداشت (مثل سوالات عمومی، برنامه‌نویسی، چت کردن، سرگرمی یا هر موضوع دیگری)، محدود به سایت نباش و به عنوان یک هوش مصنوعی همه‌فن‌حریف با خوش‌رویی به او پاسخ بده.
        3. همیشه لحنی دوستانه، صمیمی، گرم و کاملاً به زبان فارسی داشته باش.`;

        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
        
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [
                    { role: 'user', parts: [{ text: systemPrompt + '\n\nسوال کاربر: ' + message }] }
                ]
            })
        });

        const data = await response.json();
        
        if (data.candidates && data.candidates[0].content.parts[0].text) {
            const reply = data.candidates[0].content.parts[0].text;
            return res.status(200).json({ reply });
        } else {
            throw new Error('Invalid response structure from Gemini API');
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
