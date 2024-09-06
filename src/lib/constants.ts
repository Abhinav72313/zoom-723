import { CalendarArrowDown, CalendarArrowUp, House, Video } from "lucide-react";

export const sidebarLinks = [
    {
        title: 'Home',
        icon: House,
        url:'/'

    },
    {
        title: 'Upcoming',
        icon: CalendarArrowUp,
        url:'/upcoming'

    },{
        title: 'Previous',
        icon: CalendarArrowDown,
        url:'/previous'

    },{
        title: 'Recordings',
        icon: Video,
        url:'/recordings'

    },
   
];
