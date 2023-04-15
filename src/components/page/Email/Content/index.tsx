import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../../../store";
import {
  getEmail,
  getIsLoading,
  getMail,
  mainSliceActions,
} from "../../../../ducks/mainDucks";
import { Left } from "../../../ui/icon";
import { ROUTES } from "../../../../route/path";

import styles from "./style.module.scss";

export default function Content() {
  let location = useLocation();
  const dispatch = useAppDispatch();
  const id = location.pathname.slice(1);
  const email = useAppSelector(getEmail);
  const isLoading = useAppSelector(getIsLoading);
  const navigate = useNavigate();

  const onClickBack = () => {
    navigate(ROUTES.main);
  };

  useEffect(() => {
    if (id) {
      dispatch(getMail(id));
    }
    return () => {
      dispatch(mainSliceActions.clearMail());
    };
  }, [id, dispatch]);

  return (
    <div className={styles.body}>
      {isLoading ? (
        "Loading..."
      ) : (
        <>
          <div className={styles.title}>
            <div className={styles.icon} onClick={onClickBack}>
              <Left />
            </div>
            {email?.mail_subject}
          </div>
          <div className={styles.text}>{email?.mail_text}</div>
        </>
      )}
    </div>
  );
}
