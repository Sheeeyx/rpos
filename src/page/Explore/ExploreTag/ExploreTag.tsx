import { Row } from "antd";
import Title from "antd/lib/typography/Title";
import React from "react";
import TagsInput from "../../../components/TagInput/TagsInput";
import useCreateExploreTags from "../../../services/mutation/explore/tags/create/use-create-explore-tags";
import useDeleteExploreTags from "../../../services/mutation/explore/tags/delete/use-delete-explore-tags";
import { useGetExploreTags } from "../../../services/queries/use-get-explore-tags";

const ExploreTag = () => {
    return (
        <div>
            <Title level={2} style={{ marginBottom: 50, gap: 25 }}>
                Tags
            </Title>
            <Row style={{ marginBottom: 50, gap: 25 }}>
                <TagsInput
                    request={useCreateExploreTags}
                    title="Create Explore Tag"
                    data={useGetExploreTags}
                    registerRequest="explore-tags"
                    deleteRequest={useDeleteExploreTags}
                />
            </Row>
        </div>
    );
};

export default ExploreTag;
