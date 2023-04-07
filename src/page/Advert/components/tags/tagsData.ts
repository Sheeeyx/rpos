import regularIcon from "../../../../assets/svg/regularIcon.svg"
import HomePageIcon from "../../../../assets/svg/HomePageIcon.svg"
import ExtentdIcon from "../../../../assets/svg/ExtendedIcon.svg"
import Food from "../../../../assets/svg/Food.svg"
import Kosher from "../../../../assets/svg/Kosher.svg"
import Shuls from "../../../../assets/svg/Shuls.svg"
import Jewish from "../../../../assets/svg/jewish.svg"
import Camera from "../../../../assets/svg/camera.svg"
import Hotels from "../../../../assets/svg/hotel.svg"
import Flighth from "../../../../assets/svg/flights.svg"
import Car from "../../../../assets/svg/car.svg"

export const tagsData = [
    {
        title: "Regular",
        icon: regularIcon,
        description: "Send more people to destinatoin on your website.",
        status: "regular",

    },
    {
        title: "Extended Regular",
        icon: ExtentdIcon,
        description: "Coming Soon.",
        status: "extended",

    },
    {
        title: "Home Page Add",
        icon: HomePageIcon,
        description: "Coming Soon.",
        status: "homepage",

    }
]

export const categoryData = [
    {   
        key: "food_dining", 
        title: "Food & Dining",
        icon: Food,
        selected: false ,

    },
    {   
        key: "kosher", 
        title: "Kosher Stays",
        icon: Kosher,
        selected: false ,
    },
    {
        key: "shuls", 
        title: "Shuls",
        icon: Shuls,
        selected: false ,

    },
    {   key: "jewish", 
        title: "Jewish Resources",
        icon: Jewish,
        selected: false ,

    },
    {   key: "things",
        title: "Things to do",
        icon: Camera,
        selected: false ,

    },
    {   key: "hotels",
        title: "Hotels",
        icon: Hotels,
        selected: false ,

    },
    {   
        key: "flights",
        title: "Flights",
        icon: Flighth,
        selected: false ,

    },
    {   
        key: "car_rentals",
        title: "Car Rentals",
        icon: Car,
        selected: false ,

    }
]