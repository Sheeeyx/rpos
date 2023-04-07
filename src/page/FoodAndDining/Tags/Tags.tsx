import { Button, Row } from "antd";
import { Typography } from "antd";
import { useState } from "react";
import { toast } from "react-toastify";
import useFoodType from "../../../services/mutation/use-food-type";
import useGoodFor from "../../../services/mutation/food-and-dining/tags/good-for/create/use-good-for";
import useIthas from "../../../services/mutation/food-and-dining/tags/it-has/create/use-it-has";
import useServicesOption from "../../../services/mutation/food-and-dining/tags/service-option/create/use-service-option";
import TagsInput from "../../../components/TagInput/TagsInput";
import { useGetFoodTypeTags } from "../../../services/queries/use-food-type-tags";
import { useGetItHasTags } from "../../../services/queries/use-get-it-has-tags";
import { useGetGoodForTags } from "../../../services/queries/use-get-good-for";
import { useGetServiceOptionTags } from "../../../services/queries/use-get-service-option";
import useDeleteFoodTypeTags from "../../../services/mutation/food-and-dining/tags/food-type/use-delete-food-type";
import useDeleteItHasTags from "../../../services/mutation/food-and-dining/tags/it-has/delete/use-delete-it-has";
import useDeleteGoodForTags from "../../../services/mutation/food-and-dining/tags/good-for/delete/use-delete-good-for";
import useDeleteServiceOptionTags from "../../../services/mutation/food-and-dining/tags/service-option/delete/use-delete-service-option";

const { Title } = Typography;

const Tags = () => {
    return (
        <div>
            <Title level={2} style={{ marginBottom: 50, gap: 25 }}>
                Tags
            </Title>

            <Row style={{ flexDirection: "column" }}>
                <Row style={{ marginBottom: 50, gap: 25 }}>
                    <TagsInput
                        request={useFoodType}
                        title="Food Type"
                        data={useGetFoodTypeTags}
                        registerRequest="food-type"
                        deleteRequest={useDeleteFoodTypeTags}
                    />
                </Row>
                <Row style={{ marginBottom: 50, gap: 25 }}>
                    <TagsInput
                        request={useIthas}
                        title="It Has"
                        data={useGetItHasTags}
                        registerRequest="it-has"
                        deleteRequest={useDeleteItHasTags}
                    />
                </Row>

                <Row style={{ marginBottom: 50, gap: 25 }}>
                    <TagsInput
                        request={useGoodFor}
                        title="Good For"
                        data={useGetGoodForTags}
                        registerRequest="good-for"
                        deleteRequest={useDeleteGoodForTags}
                    />
                </Row>
                <Row style={{ marginBottom: 50, gap: 25 }}>
                    <TagsInput
                        request={useServicesOption}
                        title="Services Option"
                        data={useGetServiceOptionTags}
                        registerRequest="service-option"
                        deleteRequest={useDeleteServiceOptionTags}
                    />
                </Row>
            </Row>
        </div>
    );
};

export default Tags;
