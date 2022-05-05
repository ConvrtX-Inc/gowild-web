import {
  Box,
  Button,
  Card,
  TableCell,
  TextField,
  Typography,
} from "@material-ui/core";
import styled from "styled-components";

const AbsCircularLoadingBox = styled(Box)`
  && {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    && .MuiCircularProgress-root {
      color: #2995a8;
    }
  }
`;

const StyledCard = styled(Card)`
  && {
    box-shadow: none;
    border-radius: 20px;
    width: 100%;
    background-color: #fff;
  }
`;

const TableCellStyled = styled(TableCell)`
  && {
    border-color: #efefef;
    padding-top: 42.5px;
    padding-bottom: 49.5px;
    padding-left: 0;
    font-family: "Gilroy Semibold", "Gilroy Regular";
  }
`;

const Typography400 = styled(Typography)`
  && {
    font-family: "Poppins";
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    color: #626262;
  }
`;

const StyledTextField = styled(TextField)`
  && {
    margin-top: 6px;
    margin-bottom: 20px;
    && .Mui-focused fieldset {
      min-height: 67px;
      border-width: 2px !important;
      border-color: #2995a8;
      border-style: solid;
    }

    && input {
      height: 67px;
      padding: 20px 33px 20px 33px;
      font-family: "Gilroy Semibold";
      font-size: 16px;
      line-height: 24px;
      letter-spacing: -0.025em;
      color: #242426;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      border: 2px solid #f3f3f3;
      border-radius: 22.1951px;
    }

    && textarea,
    input {
      &::placeholder {
        font-family: "Gilroy Semibold";
        font-weight: 500;
        font-size: 17.7561px;
        line-height: 27px;
        color: #000000;
        opacity: 0.4;
        display: flex;
        align-items: center;
      }
    }
    && fieldset {
      min-height: 67px;
      margin-top: 2px;
      border-radius: 22.1951px;
      border-color: transparent;
    }

    && .MuiInputBase-multiline fieldset {
      border: 2px solid #f3f3f3;
    }

    && .MuiInputBase-multiline.Mui-focused fieldset {
      border-width: 2px !important;
      border-color: #2995a8;
      border-style: solid;

      && textarea {
        min-height: 132px;
      }
    }

    && textarea {
      font-family: "Gilroy Semibold";
      font-size: 16px;
      line-height: 24px;
      letter-spacing: -0.025em;
      color: #242426;
      min-height: 132px;
      height: 132px;
      max-height: 132px;
      overflow-y: auto !important;
    }
  }
`;

const DashboardButton = styled(Button)`
  && {
    border-radius: 10px;
    padding: 13px 15px 13px 16px;
    font-family: "Gilroy Bold";
    font-size: 14px;
    line-height: 16px;
    text-align: center;
    background-image: url("/static/route-list/create-btn.png");
    background-color: #00755e;
    color: #ffffff;
  }
`;

const TextFieldLabel = styled(Typography)`
  && {
    font-family: "Gilroy SemiBold";
    font-size: 16px;
    line-height: 17.76px;
    color: #22333b;
  }
`;

const OptionsBox = styled(Box)`
  && {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
`;
const StyledOption = styled.option`
  && {
    cursor: pointer;
    font-family: "Poppins";
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 18px;
    padding: 9px 24px 9px 19px;
    color: #09110e;
    &:hover {
      background: #e5e7eb;
    }
  }
`;
export {
  StyledCard,
  TableCellStyled,
  Typography400,
  StyledTextField,
  DashboardButton,
  TextFieldLabel,
  OptionsBox,
  StyledOption,
  AbsCircularLoadingBox,
};
