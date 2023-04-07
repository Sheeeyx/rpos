import { Route, Routes } from "react-router-dom";
import { Page } from "../../components/PageContent/Page";
import { Faq } from "../Terms/FAQ";
import { FaqCreate } from "./FAQ/FaqCreate";
import { LegalNotices } from "./LegalNotices";
import { LegalNoticesCreate } from "./LegalNotices/Create";
import { PrivacyPolicy } from "./PrivacyPolicy";
import { PrivacyPolicyCreate } from "./PrivacyPolicy/Create/PrivacyPolicyCreate";
import { TermsConditions } from "./TermsConditions";

const Terms = () => {
    return (
        <Page>
            <Routes>
                <Route path="faq/*" element={<Faq />}>
                    <Route path="create" element={<FaqCreate />} />
                </Route>
                <Route path="legal-notices/*" element={<LegalNotices />}>
                    <Route path="create" element={<LegalNoticesCreate/>} />
                </Route>
                <Route path="privacy-policy/*" element={<PrivacyPolicy />}/>
                <Route path="terms-conditions/*" element={<TermsConditions />} />
                
            </Routes>
        </Page>
    );
};

export default Terms;
