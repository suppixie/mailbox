import {
  FaInbox,
  FaStar,
  FaTrash,
  FaPaperPlane,
  FaRegEdit,
  FaTag,
  FaRegFile,
  FaExclamationCircle,
  FaExclamation,
  FaShoppingBag,
  FaDotCircle,
  FaCommentDots,
  FaMailBulk
} from "react-icons/fa";

export const initialFolders = [
  { id: "inbox", name: "Inbox", icon: FaInbox },
  { id: "sent", name: "Sent mails", icon: FaPaperPlane },
  { id: "drafts", name: "Drafts", icon: FaRegEdit },
  { id: "trash", name: "Trash", icon: FaTrash },
  { id: "spam", name: "Spam", icon: FaExclamationCircle },
  { id: "starred", name: "Starred", icon: FaStar },
  { id: "documents", name: "Documents", icon: FaRegFile },
  { id: "primary", name: "Primary", icon: FaExclamation, isCategory: true },
  { id: "promotions", name: "Promotions", icon: FaShoppingBag, isCategory: true },
  { id: "other", name: "Other", icon: FaMailBulk, isCategory: true },
];


export const initialEmails = {
  e1: {
    id: "e1",
    folder: "inbox",
    category: "primary",
    address:"netflix@gmail.com",
    read: false,
    starred: false,
    new: true,
    labels: [],
    from: "Netflix",
    subject: "Your Netflix temporary access code",
    excerpt: "We received a request for a temporary access code from the device below.",
content: `
<div style="font-family:Arial, sans-serif; font-size:14px; color:#333; line-height:1.6;">
  <div style="border-bottom:2px solid #e50914; padding-bottom:8px; margin-bottom:16px;">
    <h2 style="color:#e50914; margin:0;">Netflix</h2>
    <small style="color:#888;">Security Notification</small>
  </div>

  <p>Hi there,</p>

  <p>We received a request for a temporary access code from the device below:</p>

  <table style="border-collapse:collapse; margin:12px 0; font-size:14px;">
    <tr><td style="padding:4px 8px; font-weight:bold;">Device:</td><td>Chrome on Windows 11</td></tr>
    <tr><td style="padding:4px 8px; font-weight:bold;">Location:</td><td>Dublin, Ireland</td></tr>
    <tr><td style="padding:4px 8px; font-weight:bold;">Requested At:</td><td>15 Aug 2025, 8:58 PM</td></tr>
  </table>

  <p style="margin:12px 0;">If this was you, please enter the code below:</p>

  <div style="background:#f6f6f6; border:1px solid #ddd; display:inline-block; padding:12px 24px; font-size:20px; font-weight:bold; border-radius:4px; letter-spacing:2px;">
    482193
  </div>

  <p style="margin-top:16px;">If you did not make this request, 
    <a href="https://www.netflix.com/reset-password" style="color:#e50914;">reset your password</a> immediately.
  </p>

  <p>Thank you,<br/><b>Netflix Security Team</b></p>

  <hr style="border:none; border-top:1px solid #eee; margin:20px 0;"/>
  <small style="color:#777;">This is an automated message. Please do not reply.</small>
</div>
`
,    time:"1:00 PM",
    date:"15/08/2025",
    avatar: "N",
  },
  e2: {
    id: "e2",
    folder: "inbox",
    category: "promotions",
    address:"pigtowntimes@gmail.com",
    read: false,
    starred: false,
        new: true,
    labels: [],
    from: "Pigtown Times",
    subject: "Twilight Thursday & August Long Weekend",
    excerpt: "Your guide to what's on in Limerick this week",
content: `
      <div style="font-family:Georgia, serif; font-size:15px; color:#333; line-height:1.7;">
        <h2 style="margin:0; color:#4a2c2a;">Pigtown Times</h2>
        <small style="color:#888;">Weekly Events Guide • Limerick</small>
        <hr style="border:none; border-top:1px solid #ccc; margin:12px 0;"/>
        <p>Hello,</p>
        <p>Here's your weekly guide to what's happening in Limerick:</p>
        <ul style="padding-left:20px; margin:8px 0;">
          <li><b>Twilight Thursday</b> – Milk Market, 5 PM onwards</li>
          <li><b>Food Trucks</b> – Gourmet burgers, Thai street food, artisan coffee</li>
          <li><b>Live Music</b> – Folk & Jazz performances at The Locke Bar</li>
          <li><b>Art Exhibitions</b> – Local artists at Limerick City Gallery</li>
        </ul>
        <div style="background:#faf5e4; padding:12px; border-left:4px solid #d4a017; margin:16px 0;">
          <b>August Long Weekend Highlights:</b>
          <ul style="margin:8px 0;">
            <li>Family workshops at Hunt Museum</li>
            <li>Outdoor cinema at People's Park</li>
            <li>Special offers at local cafes</li>
          </ul>
        </div>
        <p>📅 <i>Plan ahead and make the most of your weekend!</i></p>
        <p>
          <a href="https://pigtowntimes.ie/events" 
             style="display:inline-block; background:#4a2c2a; color:#fff; padding:8px 14px; text-decoration:none; border-radius:4px;">
             View Full Events List
          </a>
        </p>
        <hr style="border:none; border-top:1px solid #ccc; margin:20px 0;"/>
        <small style="color:#888;">Pigtown Times, Limerick, Ireland</small>
      </div>
    `,    time:"11:15 AM",
    date:"15/08/2025",
    avatar: "📰",
  },
  e3: {
    id: "e3",
    folder: "inbox",
    category: "primary",
    address:"linkedin.jobalerts@gmail.com",
    read: true,
    starred: false,
        new: true,
    labels: ["Job Alerts"],
    from: "LinkedIn",
    subject: "New jobs similar to Staff Product Designer at TheyDo",
    excerpt: "Jobs similar to Staff Product Designer at TheyDo - Journey Management",
content: `
      <div style="font-family:Arial, sans-serif; color:#333;">
        <h2 style="color:#0073b1;">LinkedIn Weekly Insights</h2>
        <p>Hi Alex,</p>
        <p>Your profile views are up by <b>23%</b> compared to last week.</p>
        <div style="background:#f3f6f8; padding:12px; border-radius:4px; margin:16px 0;">
          <p><b>Top Companies Viewing You:</b></p>
          <ul>
            <li>Microsoft Ireland</li>
            <li>Accenture Dublin</li>
            <li>Stripe</li>
          </ul>
        </div>
        <p>
          <a href="https://linkedin.com" style="color:#0073b1; font-weight:bold;">See who viewed your profile →</a>
        </p>
      </div>
    `,    time:"9:20 AM",
    date:"15/08/2025",    
    avatar: "in",
  },
  e4: {
    id: "e4",
    folder: "inbox",
    category: "other",
    address: "github@security.com",
    read: false,
    starred: false,
        new: true,
    labels: [],
    from: "GitHub",
    subject: "Security Alert: Suspicious login detected",
    excerpt: "We detected a login from a new device.",
    content: `
      <div style="font-family:Arial, sans-serif; color:#333;">
        <h2 style="color:#24292f;">GitHub Security Alert</h2>
        <p>We detected a login to your account from a new device:</p>
        <ul>
          <li>Location: Berlin, Germany</li>
          <li>Device: Firefox on MacOS</li>
          <li>Time: 15 Aug 2025, 4:20 PM</li>
        </ul>
        <p>If this was you, you can ignore this email. If not, please <a href="#">secure your account</a>.</p>
      </div>
    `,
    time: "8:46 AM",
    date: "15/08/2025",
    avatar: "🐙",
  },
 e5: {
    id: "e5",
    folder: "inbox",
    category: "promotions",
    address: "ryanair@booking.com",
    read: false,
    starred: false,
    new: false,
    labels: [],
    from: "Ryanair",
    subject: "Your flight itinerary – Dublin to Rome",
    excerpt: "Flight FR1234 – Boarding at 6:45 AM, 20 Aug 2025.",
    content: `
      <div style="font-family:Arial, sans-serif; color:#333;">
        <h2 style="color:#003580;">Ryanair Flight Confirmation</h2>
        <p><b>Passenger:</b> Alex Murphy</p>
        <p><b>Flight:</b> FR1234</p>
        <p><b>Route:</b> Dublin (DUB) → Rome Ciampino (CIA)</p>
        <p><b>Date:</b> 20 Aug 2025</p>
        <p><b>Boarding Time:</b> 6:45 AM</p>
        <hr/>
        <p>Check-in online to avoid airport fees.</p>
      </div>
    `,
    time: "2:00 PM",
    date: "15/08/2025",
    avatar: "✈️",
  },

 e6: {
    id: "e6",
    folder: "inbox",
    category: "primary",
    address: "amazon@order.com",
    read: false,
    starred: true,
        new: false,
    labels: [],
    from: "Amazon",
    subject: "Your Amazon order has been shipped",
    excerpt: "Order #112-4587993 – Estimated delivery: 18 Aug 2025",
    content: `
      <div style="font-family:Arial, sans-serif; color:#333;">
        <h2 style="color:#ff9900;">Amazon</h2>
        <p>Hi Alex,</p>
        <p>Your order <b>#112-4587993</b> has been shipped and is on its way.</p>
        <p><b>Estimated Delivery:</b> Monday, 18 Aug 2025</p>
        <p><b>Items:</b></p>
        <ul>
          <li>Noise Cancelling Headphones</li>
          <li>USB-C Charging Cable</li>
        </ul>
        <p>
          <a href="#" style="color:#ff9900;">Track your package →</a>
        </p>
      </div>
    `,
    time: "12:10 PM",
    date: "15/08/2025",
    avatar: "A",
  },

  e7: {
    id: "e7",
    folder: "inbox",
    category: "primary",
    address: "spotify@payments.com",
    read: true,
    starred: false,
        new: false,
    labels: [],
    from: "Spotify",
    subject: "Your Premium payment receipt",
    excerpt: "You have been charged €9.99 for your monthly subscription.",
    content: `
      <div style="font-family:Arial, sans-serif; color:#333;">
        <h2 style="color:#1db954;">Spotify</h2>
        <p>Hi Alex,</p>
        <p>This is a receipt for your Premium subscription.</p>
        <ul>
          <li>Amount: €9.99</li>
          <li>Date: 15 Aug 2025</li>
          <li>Payment Method: Visa ending in 1245</li>
        </ul>
        <p>Enjoy uninterrupted music streaming!</p>
      </div>
    `,
    time: "10:05 AM",
    date: "15/08/2025",
    avatar: "🎵",
  },

  e8: {
    id: "e8",
    folder: "inbox",
    category: "primary",
    address: "udemy@courses.com",
    read: false,
    starred: false,
        new: false,
    labels: [],
    from: "Udemy",
    subject: "Congratulations! You've completed 'React for Beginners'",
    excerpt: "Here's your certificate of completion.",
    content: `
      <div style="font-family:Arial, sans-serif; color:#333;">
        <h2 style="color:#ec5252;">Udemy</h2>
        <p>Hi Alex,</p>
        <p>Congratulations on completing the course <b>React for Beginners</b>.</p>
        <p>Your certificate is now available for download:</p>
        <p>
          <a href="#" style="color:#ec5252; font-weight:bold;">View Certificate →</a>
        </p>
      </div>
    `,
    time: "8:30 AM",
    date: "15/08/2025",
    avatar: "🎓",
  },

  e9: {
    id: "e9",
    folder: "inbox",
    category: "primary",
    address: "canva@share.com",
    read: true,
    starred: false,
        new: false,
    labels: [],
    from: "Canva",
    subject: "A design was shared with you",
    excerpt: "Sophie shared 'Marketing Poster' with you on Canva.",
    content: `
      <div style="font-family:Arial, sans-serif; color:#333;">
        <h2 style="color:#8a2be2;">Canva</h2>
        <p>Sophie shared the design <b>'Marketing Poster'</b> with you.</p>
        <p>
          <a href="#" style="color:#8a2be2;">Open Design →</a>
        </p>
      </div>
    `,
    time: "8:10 AM",
    date: "15/08/2025",
    avatar: "🎨",
  },

  e10: {
    id: "e10",
    folder: "inbox",
    category: "primary",
    address: "paypal@alerts.com",
    read: false,
    starred: false,
        new: false,
    labels: [],
    from: "PayPal",
    subject: "Unusual activity detected",
    excerpt: "We noticed a new login to your PayPal account.",
    content: `
      <div style="font-family:Arial, sans-serif; color:#333;">
        <h2 style="color:#00457c;">PayPal Security</h2>
        <p>We noticed a new login from:</p>
        <ul>
          <li>Location: Warsaw, Poland</li>
          <li>Browser: Chrome</li>
          <li>Time: 3:12 AM</li>
        </ul>
        <p>If this wasn't you, please <a href="#">secure your account</a> immediately.</p>
      </div>
    `,
    time: "3:15 AM",
    date: "15/08/2025",
    avatar: "💳",
  },
  e11: {
    id: "e11",
    folder: "trash",
    category: "other",
    address: "daily@recipebox.com",
    read: true,
        new: false,
    starred: false,
    labels: [],
    from: "Recipe Box",
    subject: "Your subscription has ended",
    excerpt: "Your subscription to Daily Recipes has ended.",
    content: "Hello,\n\nYour subscription to Daily Recipes has ended. If you wish to continue receiving our emails, please renew at our website.\n\nBest,\nDaily Recipes Team",
    time: "8:20 AM",
    date: "13/08/2025",
    avatar: "📄",
  },
   e12: {
    id: "e12",
    folder: "drafts",
    category: "primary",
    address: "patalaymamtha@gmail.com",
    read: false,
    starred: false,
        new: false,
    labels: [],
    from: "Mamtha Patalay",
    subject: "(Draft) Follow-up on Meeting",
    excerpt: "Just wanted to confirm if you received the previous document...",
    content: "Hi Sarah,\n\nJust wanted to confirm if you received the previous document I sent last week. Will send more details once confirmed.\n\nBest,\nMamtha",
    time: "3:10 PM",
    date: "14/08/2025",
    avatar: "M",
  },
  e13: {
    id: "e13",
    folder: "sent",
    category: "primary",
    address: "patalaymamtha@gmail.com",
    read: true,
        new: false,
    starred: false,
    labels: [],
    from: "Mamtha Patalay",
    subject: "Project Proposal Submission",
    excerpt: "Please find attached the final proposal for review.",
    content: "Hi John,\n\nPlease find attached the final project proposal for your review. Let me know if you need any adjustments.\n\nBest regards,\nMamtha",
    time: "5:30 PM",
    date: "14/08/2025",
    avatar: "M",
  },
};

export const defaultLabels = ["Job Alerts", "Interviews"];
