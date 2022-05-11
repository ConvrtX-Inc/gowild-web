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
    border-color: rgba(255, 120, 81, 1);
    padding: 23px 0;
    text-align: center;
    font-family: "Gilroy Semibold", "Gilroy Regular";
  }
`;

const Typography400 = styled(Typography)`
  && {
    font-family: "Gilroy SemiBold";
    font-weight: 400;
    font-size: 18px;
    line-height: 21px;
    letter-spacing: 0.05rem;
    color: #000000;
  }
`;

const StyledTextField = styled(TextField)`
  && {
    margin-top: 6px;
    margin-bottom: 20px;
    border-radius: 22.1951px;
    overflow: hidden;

    && .MuiInputBase-multiline.MuiInputBase-root {
      padding: 0;
    }

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
      display: flex;
      align-items: center;
      box-sizing: border-box;
      border: 2px solid #f3f3f3;
      border-radius: 22.1951px;
    }

    && textarea,
    input {
      color: rgba(0, 0, 0, 0.4);
      &::placeholder {
        font-family: "Gilroy Semibold";
        font-weight: 500;
        font-size: 17.7561px;
        line-height: 27px;
        color: rgba(0, 0, 0, 0.2);
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
        min-height: 211px;
      }
    }

    && textarea {
      font-family: "Gilroy Semibold";
      font-size: 16px;
      line-height: 24px;
      letter-spacing: -0.025em;
      min-height: 211px;
      height: 211px;
      max-height: 211px;
      overflow-y: auto !important;
      padding: 20px 33px 20px 33px;
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
    padding-left: 6px;
    cursor: pointer;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 12.4733px;
    &:hover {
      background-color: #e5e7eb;
    }
  }
`;

const StyledOption = styled.option`
  && {
    cursor: pointer;
    font-family: "Gilroy Medium";
    font-size: 0.875rem;
    line-height: 16px;
    letter-spacing: 0.02rem;
    color: #878787;
    padding: 4px 24px 4px 5px;
    text-align: center;
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
