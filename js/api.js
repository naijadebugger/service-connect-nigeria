/**
 * ServiceConnect Nigeria - Development Mock Database
 * Single source for all dashboard pages during development.
 * 
 * NOTE: This file contains temporary mock data to be used while 
 * waiting for API endpoints from the backend team.
*
 * @author Chibuikem Victor Ugwu (@naijadebugger)
 */

// ============================================================
// CUSTOMER DASHBOARD - Okwesili Amamchukwu Franklyn
// dashboards/customer/index.html + My Bookings tab
// ============================================================

export const customerDashboardStats = {
  totalBookings: 15,
  activeNow: 2,
  completed: 12,
  totalSpent: 45000,
  successRate: 80,
  avgPerService: 3000,
};

export const activeBookings = [
  {
    id: "BK-001",
    service: "Electrical Wiring Repair",
    artisanName: "Chinedu Okafor",
    artisanPhone: "+2348012345678",
    status: "In Progress",
    scheduledTime: "2:00 PM",
    scheduledDate: "Today",
    location: "Victoria Island, Lagos",
  },
  {
    id: "BK-002",
    service: "Kitchen Leak Fix",
    artisanName: "Tunde Adebayo",
    artisanPhone: "+2348123456789",
    status: "Scheduled",
    scheduledTime: "10:00 AM",
    scheduledDate: "Tomorrow",
    location: "Lekki Phase 1, Lagos",
  },
];

export const myBookings = [
  {
    id: "BK-001",
    artisanName: "Chinedu Okeke",
    artisanAvatar: "https://ui-avatars.com/api/?name=Chinedu+Okeke&background=0B2240&color=fff",
    service: "Electrical Repair - Full House Wiring",
    date: "Today, 2:00 PM",
    location: "Victoria Island, Lagos",
    status: "In Progress",
  },
  {
    id: "BK-002",
    artisanName: "Aisha Mohammed",
    artisanAvatar: "https://ui-avatars.com/api/?name=Aisha+Mohammed&background=FF8C00&color=fff",
    service: "Plumbing - Pipe Leakage Repair",
    date: "Tomorrow, 10:00 AM",
    location: "Lekki Phase 1, Lagos",
    status: "Scheduled",
  },
  {
    id: "BK-003",
    artisanName: "Samuel Obi",
    artisanAvatar: "https://ui-avatars.com/api/?name=Samuel+Obi&background=1D3557&color=fff",
    service: "Carpentry - Cabinet Installation",
    date: "Jun 28, 2024, 9:00 AM",
    location: "Ikeja, Lagos",
    status: "Pending",
  },
];

export const recentServices = [
  {
    artisanName: "Fatima Ahmed",
    artisanAvatar: "https://ui-avatars.com/api/?name=Fatima+Ahmed&background=1D3557&color=fff",
    service: "Deep Cleaning",
    date: "Oct 12, 2023",
    rating: 4.8,
  },
  {
    artisanName: "John Eze",
    artisanAvatar: "https://ui-avatars.com/api/?name=John+Eze&background=0B2240&color=fff",
    service: "AC Maintenance",
    date: "Oct 08, 2023",
    rating: 5.0,
  },
  {
    artisanName: "Samuel Obi",
    artisanAvatar: "https://ui-avatars.com/api/?name=Samuel+Obi&background=FF8C00&color=fff",
    service: "Furniture Assembly",
    date: "Sep 28, 2023",
    rating: 4.5,
  },
];

// ============================================================
// CONFIRM BOOKING - Ezeja Moses Chukwubuikem
// dashboards/customer/confirm-booking.html
// ============================================================

export const bookingDetails = {
  artisanName: "Tunde Adebayo",
  artisanTrade: "Master Plumber",
  artisanAvatar: "https://picsum.photos/200?random=5",
  artisanRating: 4.9,
  artisanReviews: 112,
  artisanLocation: "Lagos, NG",
  artisanBadges: ["120+ Bookings", "Fast Response"],
  verified: true,
  pricing: {
    baseCallFee: 5000,
    estimatedLabourMin: 8500,
    estimatedTotal: 13500,
  },
};

// ============================================================
// SERVICE HISTORY - Stephanie Chimdalu
// dashboards/customer/service-history.html
// ============================================================

export const serviceHistory = [
  {
    id: "SH-001",
    artisanName: "Oluwaseun Adebayo",
    trade: "Plumbing",
    avatar: "https://ui-avatars.com/api/?name=Oluwaseun+Adebayo&background=0B2240&color=fff",
    date: "Oct 15, 2023",
    amount: 15000,
    rating: 5,
    status: "Completed",
  },
  {
    id: "SH-002",
    artisanName: "Ngozi Chukwu",
    trade: "Electrical",
    avatar: "https://ui-avatars.com/api/?name=Ngozi+Chukwu&background=FF8C00&color=fff",
    date: "Sep 28, 2023",
    amount: 22500,
    rating: 2,
    status: "Completed",
  },
  {
    id: "SH-003",
    artisanName: "Chinedu Okafor",
    trade: "Cleaning",
    avatar: "https://ui-avatars.com/api/?name=Chinedu+Okafor&background=1D3557&color=fff",
    date: "Aug 12, 2023",
    amount: 8000,
    rating: 3,
    status: "Completed",
  },
  {
    id: "SH-004",
    artisanName: "Tunde Bakare",
    trade: "Carpentry",
    avatar: "https://ui-avatars.com/api/?name=Tunde+Bakare&background=0B2240&color=fff",
    date: "Jul 04, 2023",
    amount: 35000,
    rating: 5,
    status: "Completed",
  },
  {
    id: "SH-005",
    artisanName: "Bisi Akande",
    trade: "AC Maintenance",
    avatar: "https://ui-avatars.com/api/?name=Bisi+Akande&background=FF8C00&color=fff",
    date: "Jun 18, 2023",
    amount: 12000,
    rating: 4,
    status: "Completed",
  },
];

// ============================================================
// CUSTOMER REVIEWS - Ugwuanyi Annastesia Amarachi
// dashboards/customer/reviews.html
// ============================================================

export const pendingReviews = [
  {
    id: 1,
    artisanName: "Oluwaseun Adeyemi",
    artisanAvatar: "https://ui-avatars.com/api/?name=Oluwaseun+Adeyemi&background=0B2240&color=fff",
    trade: "Plumbing",
    serviceType: "Leak Repair",
    completedDate: "Oct 24, 2023",
  },
  {
    id: 2,
    artisanName: "Chinedu Okafor",
    artisanAvatar: "https://ui-avatars.com/api/?name=Chinedu+Okafor&background=FF8C00&color=fff",
    trade: "Electrical",
    serviceType: "Wiring Install",
    completedDate: "Oct 20, 2023",
  },
];

export const pastReviews = [
  {
    id: 1,
    artisanName: "Tunde Bakare",
    artisanAvatar: "https://ui-avatars.com/api/?name=Tunde+Bakare&background=0B2240&color=fff",
    trade: "Carpentry",
    reviewText: "Excellent work building the custom shelves for my living room. Very professional and cleaned up after the job. Highly recommend.",
    reviewedOn: "Sep 15, 2023",
  },
  {
    id: 2,
    artisanName: "Fatima Ahmed",
    artisanAvatar: "https://ui-avatars.com/api/?name=Fatima+Ahmed&background=1D3557&color=fff",
    trade: "Deep Cleaning",
    reviewText: "The team did a spectacular job cleaning post-construction dust. Every corner was attended to properly.",
    reviewedOn: "Aug 20, 2023",
  },
];

// ============================================================
// ARTISAN DASHBOARD - Collins Ugwu
// dashboards/artisan/index.html
// ============================================================

export const artisanDashboardStats = {
  totalJobs: 48,
  pendingRequests: 5,
  rating: 4.9,
  totalReviews: 24,
  earningsThisMonth: 124500,
};

export const recentActivity = [
  {
    id: 1,
    type: "new_request",
    description: "New request from Amaka O. for Plumbing",
    location: "Lekki Phase 1",
    time: "Today, 10:30 AM",
    actionRequired: true,
  },
  {
    id: 2,
    type: "job_completed",
    description: "Job completed: Electrical repair for John D.",
    location: "Victoria Island",
    time: "Yesterday, 2:15 PM",
    amount: 15000,
    paid: true,
  },
  {
    id: 3,
    type: "new_review",
    description: "New 5-star review received",
    reviewText: "Tunde was very professional and fixed the issue quickly.",
    time: "2 days ago",
  },
];

export const upcomingJobs = [
  {
    id: 1,
    service: "Generator Servicing",
    time: "09:00 AM - 11:00 AM",
    scheduledFor: "Tomorrow",
    customerName: "Sarah O.",
    customerLocation: "Ikeja",
    customerAvatar: "https://ui-avatars.com/api/?name=Sarah+O&background=FF8C00&color=fff",
  },
];

// ============================================================
// INCOMING REQUESTS + JOB HISTORY - Timothy Favour Chinenyenwa
// dashboards/artisan/incoming.html + history.html
// ============================================================

export const incomingRequests = [
  {
    id: 1,
    customerName: "Sarah Jenkins",
    customerAvatar: "https://ui-avatars.com/api/?name=Sarah+Jenkins&background=1D3557&color=fff",
    customerLocation: "Victoria Island, Lagos",
    serviceType: "Plumbing Service",
    description: "Leaking faucet in the kitchen, needs urgent replacement. Water is steadily dripping and the...",
    requestedDate: "Today, 2:00 PM",
    timestamp: "Just now",
  },
  {
    id: 2,
    customerName: "Michael Okeke",
    customerAvatar: "https://ui-avatars.com/api/?name=Michael+Okeke&background=0B2240&color=fff",
    customerLocation: "Lekki Phase 1, Lagos",
    serviceType: "Electrical Repair",
    description: "Power fluctuation in the living room area. Several sockets are completely dead and the...",
    requestedDate: "Tomorrow, 10:00 AM",
    timestamp: "2h ago",
  },
  {
    id: 3,
    customerName: "Grace Adebayo",
    customerAvatar: "https://ui-avatars.com/api/?name=Grace+Adebayo&background=FF8C00&color=fff",
    customerLocation: "Ikeja, Lagos",
    serviceType: "Carpentry",
    description: "Wardrobe hinge is broken and the door won't close properly. Needs a quick fix before the...",
    requestedDate: "Oct 24, 4:30 PM",
    timestamp: "1d ago",
  },
];

export const jobHistory = [
  {
    id: "SC-8492",
    customerName: "Oluwaseun Adeyemi",
    customerAvatar: "https://ui-avatars.com/api/?name=Oluwaseun+Adeyemi&background=0B2240&color=fff",
    serviceType: "Plumbing Repair",
    date: "Oct 24, 2023",
    time: "10:30 AM",
    amount: 15000,
    status: "Completed",
  },
  {
    id: "SC-8488",
    customerName: "Chidi Ike",
    customerAvatar: "https://ui-avatars.com/api/?name=Chidi+Ike&background=1D3557&color=fff",
    serviceType: "AC Installation",
    date: "Oct 22, 2023",
    time: "02:00 PM",
    amount: 45000,
    status: "Cancelled",
  },
  {
    id: "SC-8475",
    customerName: "Musa Ibrahim",
    customerAvatar: "https://ui-avatars.com/api/?name=Musa+Ibrahim&background=FF8C00&color=fff",
    serviceType: "Electrical Wiring",
    date: "Oct 18, 2023",
    time: "09:15 AM",
    amount: 28500,
    status: "Completed",
  },
  {
    id: "SC-8450",
    customerName: "Funke Ojo",
    customerAvatar: "https://ui-avatars.com/api/?name=Funke+Ojo&background=0B2240&color=fff",
    serviceType: "Generator Repair",
    date: "Oct 15, 2023",
    time: "11:00 AM",
    amount: 12000,
    status: "Completed",
  },
];

// ============================================================
// EARNINGS + RATINGS - Odo Obinna Amos
// dashboards/artisan/earnings.html + ratings.html
// ============================================================

export const artisanEarnings = {
  totalBalance: 450000,
  earningsThisMonth: 125500,
  monthlyGrowth: 12,
  pendingPayouts: 45000,
  payoutProcessingDays: "1-2 biz days",
  trend: [
    { month: "Jan", amount: 60000 },
    { month: "Feb", amount: 80000 },
    { month: "Mar", amount: 70000 },
    { month: "Apr", amount: 95000 },
    { month: "May", amount: 110000 },
    { month: "Jun", amount: 125500 },
  ],
  recentTransactions: [
    {
      id: "TXN-84920-NG",
      date: "12 Jun 2024",
      method: "GTBank Transfer",
      amount: 45000,
      status: "Successful",
    },
    {
      id: "TXN-84915-NG",
      date: "10 Jun 2024",
      method: "First Bank Transfer",
      amount: 120500,
      status: "Successful",
    },
    {
      id: "TXN-84902-NG",
      date: "05 Jun 2024",
      method: "GTBank Transfer",
      amount: 35000,
      status: "Processing",
    },
  ],
};

export const artisanRatings = {
  overallRating: 4.9,
  totalReviews: 48,
  completionRate: 98,
  breakdown: { 5: 41, 4: 5, 3: 2, 2: 0, 1: 0 },
  customerReviews: [
    {
      id: 1,
      customerName: "Amina O.",
      customerAvatar: "https://ui-avatars.com/api/?name=Amina+O&background=1D3557&color=fff",
      serviceType: "Plumbing Repair",
      timeAgo: "2 days ago",
      rating: 5,
      reviewText: "Tunde was very professional and fixed the leak quickly. He explained the issue clearly and left the work area clean. Highly recommended!",
      reply: null,
    },
    {
      id: 2,
      customerName: "Emeka N.",
      customerAvatar: "https://ui-avatars.com/api/?name=Emeka+N&background=0B2240&color=fff",
      serviceType: "Water Heater Installation",
      timeAgo: "1 week ago",
      rating: 4,
      reviewText: "Good service overall. The installation took a bit longer than estimated, but the quality of work is solid. Would use again.",
      reply: "Thank you for the feedback, Emeka. I appreciate your patience with the extra time needed to ensure the installation was perfect.",
      replyTime: "6 days ago",
    },
    {
      id: 3,
      customerName: "Samuel I.",
      customerAvatar: "https://ui-avatars.com/api/?name=Samuel+I&background=FF8C00&color=fff",
      serviceType: "Pipe Replacement",
      timeAgo: "2 weeks ago",
      rating: 5,
      reviewText: "Excellent workmanship. The old pipes were a mess but he sorted it out efficiently and without much disruption. Very polite and respectful.",
      reply: null,
    },
  ],
};

// ============================================================
// ADMIN DASHBOARD - Chibuikem Victor Ugwu (@naijadebugger)
// dashboards/admin/ - all 7 pages
// ============================================================

export const users = [
  {
    id: 1,
    name: "Oluwaseun Adebayo",
    email: "oluwaseun.a@example.com",
    avatar: "https://ui-avatars.com/api/?name=Oluwaseun+Adebayo&background=0B2240&color=fff",
    role: "Customer",
    status: "Active",
    joined: "Oct 12, 2023",
  },
  {
    id: 2,
    name: "Chinedu Eze",
    email: "c.eze.plumbing@example.com",
    avatar: "https://ui-avatars.com/api/?name=Chinedu+Eze&background=FF8C00&color=fff",
    role: "Artisan",
    status: "Active",
    joined: "Nov 05, 2023",
  },
  {
    id: 3,
    name: "Ngozi Ibeh",
    email: "n.ibeh99@example.com",
    avatar: "https://ui-avatars.com/api/?name=Ngozi+Ibeh&background=1D3557&color=fff",
    role: "Customer",
    status: "Suspended",
    joined: "Jan 22, 2024",
  },
  {
    id: 4,
    name: "Abubakar Musa",
    email: "abu.electric@example.com",
    avatar: "https://ui-avatars.com/api/?name=Abubakar+Musa&background=0B2240&color=fff",
    role: "Artisan",
    status: "Pending",
    joined: "Feb 14, 2024",
  },
  {
    id: 5,
    name: "Titi Yusuf",
    email: "t.yusuf.designs@example.com",
    avatar: "https://ui-avatars.com/api/?name=Titi+Yusuf&background=FF8C00&color=fff",
    role: "Customer",
    status: "Active",
    joined: "Feb 28, 2024",
  },
];

export const artisans = [
  {
    id: 1,
    name: "Chinedu Ibe",
    trade: "Electrician",
    avatar: "https://picsum.photos/200?random=1",
    location: "Lagos",
    rating: 4.9,
    reviews: 182,
    verified: true,
    bookings: 321,
  },
  {
    id: 2,
    name: "Samuel Okafor",
    trade: "Plumber",
    avatar: "https://picsum.photos/200?random=2",
    location: "Abuja",
    rating: 4.8,
    reviews: 143,
    verified: true,
    bookings: 214,
  },
  {
    id: 3,
    name: "Amina Bello",
    trade: "Painter",
    avatar: "https://picsum.photos/200?random=3",
    location: "Lagos",
    rating: 4.7,
    reviews: 98,
    verified: true,
    bookings: 156,
  },
  {
    id: 4,
    name: "Tunde Bakare",
    trade: "Auto Mechanic",
    avatar: "https://picsum.photos/200?random=4",
    location: "Lagos",
    rating: 4.8,
    reviews: 211,
    verified: true,
    bookings: 289,
  },
];

export const bookings = [
  {
    id: "BK-8492",
    service: "Leaking Pipe Repair",
    category: "Plumbing",
    customer: "Chioma Adebayo",
    artisan: null,
    amount: 15000,
    status: "Pending",
    date: "Oct 24, 2023",
    time: "10:00 AM",
  },
  {
    id: "BK-8491",
    service: "Full House Deep Cleaning",
    category: "Cleaning",
    customer: "Emeka Okafor",
    artisan: "Grace Nnamdi",
    amount: 45000,
    status: "In Progress",
    date: "Oct 24, 2023",
    time: "08:00 AM",
  },
  {
    id: "BK-8490",
    service: "Generator Servicing",
    category: "Electrical",
    customer: "Sarah Johnson",
    artisan: "Michael Obi",
    amount: 25000,
    status: "Completed",
    date: "Oct 23, 2023",
    time: "02:00 PM",
  },
  {
    id: "BK-8489",
    service: "Custom Wardrobe Build",
    category: "Carpentry",
    customer: "David Peters",
    artisan: "Tunde Bakare",
    amount: 120000,
    status: "Confirmed",
    date: "Oct 25, 2023",
    time: "09:00 AM",
  },
  {
    id: "BK-8488",
    service: "AC Installation",
    category: "Electrical",
    customer: "Aisha Bello",
    artisan: null,
    amount: 35000,
    status: "Cancelled",
    date: "Oct 23, 2023",
    time: "11:00 AM",
  },
];

export const reviews = [
  {
    id: 1,
    reviewer: "Oluwaseun A.",
    reviewerAvatar: "https://ui-avatars.com/api/?name=Oluwaseun+A&background=0B2240&color=fff",
    artisan: "David Plumber",
    rating: 3,
    reviewText: "The service was okay, but he was 2 hours late...",
    status: "Reported",
    date: "Oct 24, 2023",
  },
  {
    id: 2,
    reviewer: "Chidi N.",
    reviewerAvatar: "https://ui-avatars.com/api/?name=Chidi+N&background=FF8C00&color=fff",
    artisan: "Ngozi Cleaners",
    rating: 4,
    reviewText: "Exceptional service! The team arrived on time...",
    status: "Published",
    date: "Oct 23, 2023",
  },
  {
    id: 3,
    reviewer: "Amaka T.",
    reviewerAvatar: "https://ui-avatars.com/api/?name=Amaka+T&background=1D3557&color=fff",
    artisan: "Emeka Carpenter",
    rating: 5,
    reviewText: "Absolutely fantastic work. Built exactly what I described.",
    status: "Published",
    date: "Oct 22, 2023",
  },
  {
    id: 4,
    reviewer: "Femi O.",
    reviewerAvatar: "https://ui-avatars.com/api/?name=Femi+O&background=0B2240&color=fff",
    artisan: "Tunde Electrician",
    rating: 1,
    reviewText: "Very disappointing. Work was not completed...",
    status: "Reported",
    date: "Oct 21, 2023",
  },
];

export const verificationQueue = [
  {
    id: 1,
    name: "Oluwaseun Adebayo",
    trade: "Plumber",
    location: "Lagos Mainland, Lagos",
    submitted: "Oct 24, 2023",
    status: "Pending",
    photo: "https://picsum.photos/300?random=11",
    ninSlip: "https://picsum.photos/500/300?random=21",
    certificate: "https://picsum.photos/500/300?random=31",
    guarantor: {
      name: "Mrs. Folake Adebayo",
      relationship: "Sister",
      phone: "+2348012345678",
    },
    bio: "Professional plumber with over 8 years of experience in residential and commercial plumbing installations, maintenance, and repair. Specialized in pipe fitting, water heater installation, and emergency leak repairs.",
    backgroundCheck: true,
  },
  {
    id: 2,
    name: "Nneka Okoro",
    trade: "Electrician",
    location: "Abuja, FC",
    submitted: "Oct 23, 2023",
    status: "Pending",
    photo: "https://picsum.photos/300?random=12",
    ninSlip: "https://picsum.photos/500/300?random=22",
    certificate: "https://picsum.photos/500/300?random=32",
    guarantor: {
      name: "Mr. Emeka Okoro",
      relationship: "Husband",
      phone: "+2348087654321",
    },
    bio: "Licensed electrician with 5 years experience specializing in residential wiring, inverter installations, and solar panel setup.",
    backgroundCheck: false,
  },
  {
    id: 3,
    name: "Chinedu Igwe",
    trade: "Carpenter",
    location: "Enugu, EN",
    submitted: "Oct 23, 2023",
    status: "Pending",
    photo: "https://picsum.photos/300?random=13",
    ninSlip: "https://picsum.photos/500/300?random=23",
    certificate: "https://picsum.photos/500/300?random=33",
    guarantor: {
      name: "Mr. Obinna Igwe",
      relationship: "Father",
      phone: "+2348056789012",
    },
    bio: "Master carpenter with 12 years experience in custom furniture, wardrobes, and interior woodwork for residential and commercial clients.",
    backgroundCheck: true,
  },
];

export const transactions = [
  {
    id: "SC-TX-92834",
    date: "Oct 24, 2023",
    service: "Plumbing",
    artisan: "Babatunde O.",
    artisanAvatar: "https://ui-avatars.com/api/?name=Babatunde+O&background=0B2240&color=fff",
    customer: "Chioma A.",
    amount: 45000,
    commission: 6750,
    status: "Successful",
  },
  {
    id: "SC-TX-92835",
    date: "Oct 24, 2023",
    service: "Electrical",
    artisan: "Ngozi E.",
    artisanAvatar: "https://ui-avatars.com/api/?name=Ngozi+E&background=FF8C00&color=fff",
    customer: "Femi G.",
    amount: 12500,
    commission: 1875,
    status: "Successful",
  },
  {
    id: "SC-TX-92836",
    date: "Oct 23, 2023",
    service: "Carpentry",
    artisan: "Abubakar M.",
    artisanAvatar: "https://ui-avatars.com/api/?name=Abubakar+M&background=1D3557&color=fff",
    customer: "John D.",
    amount: 85200,
    commission: 12780,
    status: "Successful",
  },
  {
    id: "SC-TX-92837",
    date: "Oct 23, 2023",
    service: "Cleaning",
    artisan: "Amaka J.",
    artisanAvatar: "https://ui-avatars.com/api/?name=Amaka+J&background=0B2240&color=fff",
    customer: "Segun L.",
    amount: 22000,
    commission: 3300,
    status: "Processing",
  },
];

export const dashboardStats = {
  totalUsers: 12450,
  totalArtisans: 3200,
  totalBookings: 8740,
  totalReviews: 5120,
  averageRating: 4.8,
  growth: {
    users: 12,
    artisans: 8,
    bookings: 15,
  },
  platformGrowth: {
    months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    users: [8000, 9400, 9800, 10600, 11500, 12450],
    artisans: [2000, 2250, 2600, 2800, 3000, 3200],
  },
  bookingStatus: {
    completed: 65,
    pending: 25,
    cancelled: 10,
  },
};

export const platformSettings = {
  platformName: "ServiceConnect Nigeria",
  supportEmail: "support@serviceconnect.com.ng",
  maintenanceMode: false,
  logoUrl: "https://ui-avatars.com/api/?name=SC&background=0B2240&color=fff&size=512",
  commissionRate: 15,
  lastUpdated: "Today at 09:42 AM",
};

// ============================================================
// PUBLIC MARKETPLACE DATA (PLACEHOLDER / MOCK DATA)
// NOTE FOR FRONTEND TEAM: 
// Replace or update the objects in this array with the exact data fields 
// needed for your page features until the backend API endpoints land.
// ============================================================

export const publicArtisans = [
  {
    id: 1,
    name: "Adekunle Johnson",
    trade: "Electrical Engineering & Wiring",
    rating: 4.9,
    reviewsCount: 128,
    location: "Lekki Phase 1, Lagos",
    experienceYears: "8+ yrs exp",
    startingPrice: "₦15,000",
    avatar: "https://picsum.photos/200?random=101",
    verified: true,
    badges: ["Fast Responder", "Top Rated"],
  },
  {
    id: 2,
    name: "Chinedu Okafor",
    trade: "Master Plumber",
    rating: 4.8,
    reviewsCount: 94,
    location: "Ikeja, Lagos",
    experienceYears: "5+ yrs exp",
    startingPrice: "₦12,000",
    avatar: "https://picsum.photos/200?random=102",
    verified: true,
    badges: ["Verified Pro"],
  },
  {
    id: 3,
    name: "Amina Bello",
    trade: "Interior & Exterior Painting",
    rating: 4.7,
    reviewsCount: 62,
    location: "Victoria Island, Lagos",
    experienceYears: "6+ yrs exp",
    startingPrice: "₦20,000",
    avatar: "https://picsum.photos/200?random=103",
    verified: true,
    badges: ["Top Rated"],
  },
  {
    id: 4,
    name: "Samuel Obi",
    trade: "Carpentry & Cabinetry",
    rating: 4.9,
    reviewsCount: 110,
    location: "Surulere, Lagos",
    experienceYears: "10+ yrs exp",
    startingPrice: "₦25,000",
    avatar: "https://picsum.photos/200?random=104",
    verified: true,
    badges: ["Verified Pro", "Master Craftsman"],
  },
];

// ============================================================
// ASYNC API SIMULATION HELPERS
// NOTE FOR FRONTEND TEAM:
// These functions simulate backend network delay (300ms). When backend 
// endpoints are live, we will swap the internal setTimeout with 
// real fetch calls: e.g. return await fetch('/api/Artisans').then(r => r.json());
// ============================================================

/**
 * Fetch public artisans list
 * @returns {Promise<Array>} Array of artisan objects
 */
export async function fetchPublicArtisans() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(publicArtisans);
    }, 300);
  });
}

/**
 * Fetch admin metrics stats
 * @returns {Promise<Object>} Object containing dashboard metrics
 */
export async function fetchAdminStats() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dashboardStats);
    }, 300);
  });
}