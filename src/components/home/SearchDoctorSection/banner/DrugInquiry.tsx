import { Banner } from './Banner';

export function DrugInquiry() {
    return (
        <Banner
            icon="/banner/drug-inquiry.png"
            title="استعلام تداخلات دارویی"
            description="دارو درخواستی شما پس از استعلام به شما نمایش داده میدهد."
            image="/banner/drug-inquiry.png"
            imageAlt="استعلام تداخلات دارویی"
            searchPlaceholder="جستجوی دارو یا خدمت"
            exampleText="مثال سونو، سی تی، نام کمپانی، کد خدمت..."
            searchIcon="/banner/service-search-icon.png"
            buttonIcon="/banner/search.png"
        />
    );
}

