import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import md5 from "md5";

import { RootState, ThunkConfig } from "../store";
import { postman } from "../utils/postman";
import { generateName } from "../utils/helperFuncion";
import { IEmail, ITempEmail } from "./type";

export const getListMail = createAsyncThunk<any, string, ThunkConfig<string>>(
  "listMail/fetchGetListMail",
  async (hash, thunkAPI) => {
    try {
      return await postman.get(
        `https://api.apilayer.com/temp_mail/mail/id/${hash}`
      );
    } catch (e) {
      return thunkAPI.rejectWithValue(e as string);
    }
  }
);

export const getMail = createAsyncThunk<any, string, ThunkConfig<string>>(
  "mail/fetchGetMail",
  async (id, thunkAPI) => {
    try {
      return await postman.get(
        `https://api.apilayer.com/temp_mail/one_mail/id/${id}`
      );
    } catch (e) {
      return thunkAPI.rejectWithValue(e as string);
    }
  }
);

export const getTempEmail = createAsyncThunk<
  ITempEmail,
  void,
  ThunkConfig<string>
>("tempEmail/fetchGetTempEmail", async (data, thunkAPI) => {
  try {
    const response = (await postman.get(
      "https://api.apilayer.com/temp_mail/domains"
    )) as string[];

    const name = `${generateName()}${response[0]}`;

    return {
      name,
      hash: md5(name),
    };
  } catch (e) {
    return thunkAPI.rejectWithValue(e as string);
  }
});

interface IMainSlice {
  tempEmail?: ITempEmail;
  isLoading: boolean;
  mail?: IEmail;
  listEmail?: IEmail[];
}

const initialState: IMainSlice = {
  isLoading: true,
};

export const mainSlice = createSlice({
  name: "mainSlice",
  initialState,
  reducers: {
    clearMail(state) {
      state.mail = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        getTempEmail.fulfilled,
        (state, action: PayloadAction<ITempEmail>) => {
          state.tempEmail = {
            name: action.payload.name,
            hash: action.payload.hash,
          };
          state.isLoading = false;
        }
      )
      .addCase(getTempEmail.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getTempEmail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getListMail.fulfilled, (state, action: any) => {
        state.listEmail = action.payload;
      })
      .addCase(getMail.fulfilled, (state, action: any) => {
        state.mail = action.payload;
        state.isLoading = false;
      })
      .addCase(getMail.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getMail.pending, (state) => {
        state.isLoading = true;
      });
  },
});

const mainStateSelector = (state: RootState) => state.mainSliceReducer;

export const getEmailTemp = createSelector(
  mainStateSelector,
  (state) => state.tempEmail
);

export const getEmail = createSelector(
  mainStateSelector,
  (state) => state.mail
);

export const getIsLoading = createSelector(
  mainStateSelector,
  (state) => state.isLoading
);

export const getListEmail = createSelector(
  mainStateSelector,
  (state) => state.listEmail
);

export const { reducer: mainSliceReducer } = mainSlice;
export const { actions: mainSliceActions } = mainSlice;
