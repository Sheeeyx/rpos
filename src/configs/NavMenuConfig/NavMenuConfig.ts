import {
    DashboardOutlined,
    CoffeeOutlined,
    FileTextOutlined,
    WarningOutlined,
    FormOutlined,
    BranchesOutlined,
    AppstoreOutlined,
    StarOutlined,
    UserOutlined,
    SnippetsOutlined,
} from "@ant-design/icons";

// key has to be unique here
const companyAdminNavTree = [
    {
        key: "dashboard",
        path: `/dashboard`,
        title: "Dashboard",
        icon: DashboardOutlined,
        breadcrumb: false,
        submenu: [],
    },
    {
        key: "jewish-resources",
        path: `/jewish-resources/*`,
        title: "jewish",
        icon: BranchesOutlined,
        breadcrumb: false,
        submenu: [
            {
                key: "chabad",
                path: `/jewish-resources/chabad/list`,
                title: "Chabad",
                breadcrumb: false,
            },
        ],
    },
    // {
    //     key: "main-explore",
    //     path: `/explore/*`,
    //     title: "Explore",
    //     icon: FormOutlined,
    //     breadcrumb: false,
    //     submenu: [
    //         {
    //             key: "create_explore",
    //             path: `/explore/explore-list`,
    //             title: "Create Explore",
    //             breadcrumb: false,
    //         },
    //         {
    //             key: "explore-tags",
    //             path: `/explore/explore-tags`,
    //             title: "Tags",
    //             breadcrumb: false,
    //         },
            
    //     ],
    // },
    // {
    //     key: "food_dining",
    //     path: `/food-and-dining/*`,
    //     title: "Food & Dining",
    //     icon: CoffeeOutlined,
    //     breadcrumb: false,
    //     submenu: [
    //         {
    //             key: "tags",
    //             path: `/food-and-dining/tags`,
    //             title: "Tags",
    //             breadcrumb: false,
    //         },
    //         {
    //             key: "restaurant",
    //             path: `/food-and-dining/restaurant/list`,
    //             title: "Restaurant",
    //             breadcrumb: false,
    //         },
    //         {
    //             key: "bakery",
    //             path: `/food-and-dining/bakery/list`,
    //             title: "Bakery",
    //             breadcrumb: false,
    //         },
    //         {
    //             key: "supermarkets",
    //             path: `/food-and-dining/supermarkets/list`,
    //             title: "Supermarkets",
    //             breadcrumb: false,
    //         },
    //         {
    //             key: "food-service",
    //             path: `/food-and-dining/food-service/list`,
    //             title: "Food Service",
    //             breadcrumb: false,
    //         },
    //         {
    //             key: "takeout",
    //             path: `/food-and-dining/takeout/list`,
    //             title: "Takeout",
    //             breadcrumb: false,
    //         },
    //     ],
    // },
    // {
    //     key: "advert",
    //     path: `/advert/*`,
    //     title: "Advertisement Deals",
    //     icon: SnippetsOutlined,
    //     breadcrumb: false,
    //     submenu: [
    //         {
    //             key: "advertisement",
    //             path: `advert/advertisement/list`,
    //             title: "Advertisement",
    //             breadcrumb: false,
    //         },
    //         {
    //             key: "banner",
    //             path: `advert/banner/list`,
    //             title: "Banner",
    //             breadcrumb: false,
    //         },
    //         {
    //             key: "travelling",
    //             path: `advert/travelling/list`,
    //             title: "Travelling Deals",
    //             breadcrumb: false,
    //         },
    //         {
    //             key: "partner",
    //             path: `advert/partner/list`,
    //             title: "Partner Deals",
    //             breadcrumb: false,
    //         }
    //     ],
    // },
    // {
    //     key: "terms",
    //     path: `/terms/*`,
    //     title: "Terms",
    //     icon: FileTextOutlined,
    //     breadcrumb: false,
    //     submenu: [
    //         {
    //             key: "privacy_policy",
    //             path: `/terms/privacy-policy/list`,
    //             title: "Privacy Policy",
    //             breadcrumb: false,
    //         },
    //         {
    //             key: "legal_notices",
    //             path: `/terms/legal-notices/list`,
    //             title: "Legal Notices",
    //             breadcrumb: false,
    //         },
    //         {
    //             key: "terms_conditions",
    //             path: `/terms/terms-conditions/list`,
    //             title: "Terms and Conditions",
    //             breadcrumb: false,
    //         },
    //         {
    //             key: "faq",
    //             path: `/terms/faq/list`,
    //             title: "FAQ",
    //             breadcrumb: false,
    //         },
    //     ],
    // },
    // {
    //     key: "voice-matters",
    //     path: `/voice-matters/*`,
    //     title: "Voice Matters",
    //     icon: StarOutlined,
    //     breadcrumb: false,
    //     submenu: [
    //         {
    //             key: "ideas",
    //             path: `/voice-matters/ideas/list`,
    //             title: "Ideas",
    //             breadcrumb: false,
    //         },
    //         {
    //             key: "review",
    //             path: `/voice-matters/reviews/list`,
    //             title: "Reviews",
    //             breadcrumb: false,
    //         },
    //         {
    //             key: "comments",
    //             path: `/voice-matters/comments/list`,
    //             title: "Comments",
    //             breadcrumb: false,
    //         },
    //         // {
    //         //     key: "rates",
    //         //     path: `/voice-matters/rates/list`,
    //         //     title: "Rates",
    //         //     breadcrumb: false,
    //         // },
    //     ],
    // },
    {
        key: "users",
        path: `/users/list`,
        title: "Пользователи",
        icon: UserOutlined,
        breadcrumb: false,
    },
    // {
    //     key: "about-app",
    //     path: `/about-app`,
    //     title: "About App",
    //     icon: AppstoreOutlined,
    //     breadcrumb: false,
    // },
    // {
    //     key: "help",
    //     path: `/help/*`,
    //     title: "Help",
    //     icon: WarningOutlined,
    //     breadcrumb: false,
    //     submenu: [
    //         {
    //             key: "contact_us",
    //             path: `/help/contact-us`,
    //             title: "Contact Us",
    //             breadcrumb: false,
    //         },
    //         {
    //             key: "safety_recource",
    //             path: `/help/safety-recource/list`,
    //             title: "Safety Recource Center",
    //             breadcrumb: false,
    //         },
    //     ],
    // },
    
];

const companyAdminNavigationConfig = [...companyAdminNavTree];

export { companyAdminNavigationConfig };
