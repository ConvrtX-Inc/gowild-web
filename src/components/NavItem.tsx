import { useState } from "react";
import type { FC, ReactNode } from "react";
import { NavLink as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";
import { Box, Button, Collapse, ListItem } from "@material-ui/core";
import styled from "styled-components";
import type { ListItemProps } from "@material-ui/core";
import ChevronDownIcon from "../icons/ChevronDown";
import ChevronRightIcon from "../icons/ChevronRight";

interface NavItemProps extends ListItemProps {
  active?: boolean;
  children?: ReactNode;
  depth: number;
  icon?: ReactNode;
  info?: ReactNode;
  open?: boolean;
  path?: string;
  title: string;
}

const NavItem: FC<NavItemProps> = (props) => {
  const {
    active,
    children,
    depth,
    icon,
    info,
    open: openProp,
    path,
    title,
    ...other
  } = props;
  const [open, setOpen] = useState<boolean>(openProp);

  const handleToggle = (): void => {
    setOpen((prevOpen) => !prevOpen);
  };

  let paddingLeft = 22;

  if (depth > 0) {
    paddingLeft = 32 + 8 * depth;
  }

  // Branch
  if (children) {
    return (
      <ListItem
        disableGutters
        sx={{
          display: "block",
          py: 0,
        }}
        {...other}
      >
        <Button
          endIcon={
            !open ? (
              <ChevronRightIcon fontSize="small" />
            ) : (
              <ChevronDownIcon fontSize="small" />
            )
          }
          onClick={handleToggle}
          startIcon={icon}
          sx={{
            color: "text.secondary",
            // fontWeight: "fontWeightMedium",
            justifyContent: "flex-start",
            pl: `${paddingLeft}px`,
            padding: "15px auto 16px",
            textAlign: "left",
            textTransform: "none",
            width: "100%",
          }}
          variant="text"
        >
          <Box sx={{ flexGrow: 1 }}>{title}</Box>
          {info}
        </Button>
        <Collapse in={open}>{children}</Collapse>
      </ListItem>
    );
  }

  // Leaf
  return (
    <ListItem
      disableGutters
      sx={{
        display: "flex",
        py: 0,
      }}
    >
      <NavButton
        component={path && RouterLink}
        startIcon={icon}
        sx={{
          color: "#E8E8E8",
          fontFamily: "Gilroy Medium",
          fontWeight: 400,
          fontSize: "1rem",
          lineHeight: "19px",
          letterSpacing: "-0.04em",
          justifyContent: "flex-start",
          textAlign: "left",
          borderRadius: "25px",
          pl: `${paddingLeft}px`,
          padding: "15px auto 16px",
          textTransform: "none",
          width: "100%",
          height: "50px",
          ...(active && {
            color: "#FFFFFF",
            backgroundColor: "#82BAA7",
            "& svg": {
              color: "#09110e",
            },
          }),
        }}
        variant="text"
        to={path}
      >
        <Box sx={{ flexGrow: 1 }}>{title}</Box>
        {info}
      </NavButton>
    </ListItem>
  );
};

NavItem.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node,
  depth: PropTypes.number.isRequired,
  icon: PropTypes.node,
  info: PropTypes.node,
  open: PropTypes.bool,
  path: PropTypes.string,
  title: PropTypes.string.isRequired,
};

NavItem.defaultProps = {
  active: false,
  open: false,
};

export default NavItem;

const NavButton = styled(Button)`
  && {
    &:hover {
      background-color: rgba(130, 186, 167, 0.4);
    }
  }
`;
