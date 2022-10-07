import * as React from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";

interface Props extends React.HTMLAttributes<HTMLElement> {
    as?: React.ElementType;
}

const AutoAnimate: React.FC<Props> = ({
    as: Tag = "div",
    children,
    ...rest
}) => {
    const [ref] = useAutoAnimate<HTMLElement>();
    return (
        <Tag ref={ref} {...rest}>
            {children}
        </Tag>
    );
};

export default AutoAnimate