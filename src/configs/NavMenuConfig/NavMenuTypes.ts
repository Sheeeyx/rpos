export interface NavMenuTypes {
    key: string;
    path: string;
    title: string;
    icon:  HTMLElement;
    breadcrumb?: boolean;
    submenu?: Array<object>
}