import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../../../store";
import {
  getEmailTemp,
  getIsLoading,
  getListEmail,
  getListMail,
  getTempEmail,
} from "../../../../ducks/mainDucks";
import { Copy, Reset } from "../../../ui/icon";

import styles from "./style.module.scss";

export default function Content() {
  const dispatch = useAppDispatch();
  const tempEmail = useAppSelector(getEmailTemp);
  const listEmail = useAppSelector(getListEmail);
  const isLoading = useAppSelector(getIsLoading);
  const navigate = useNavigate();
  const ref = useRef<ReturnType<typeof setInterval> | null>(null);

  const onClickReset = () => {
    ref.current && clearInterval(ref.current);
    dispatch(getTempEmail());
  };

  const onClickCopy = () => {
    navigator.clipboard.writeText(tempEmail?.name ?? "");
  };

  const onClickEmail = (id: string) => {
    navigate(`/${id}`);
  };

  useEffect(() => {
    if (!tempEmail) {
      dispatch(getTempEmail());
    }
  }, [dispatch, tempEmail]);

  useEffect(() => {
    if (tempEmail?.name) {
      ref.current = setInterval(() => {
        dispatch(getListMail(tempEmail?.hash));
      }, 5000);
    }
    return () => {
      ref.current && clearInterval(ref.current);
    };
  }, [tempEmail?.name]);

  return (
    <div className={styles.block}>
      <div className={styles.title}>
        <div className={styles.tempEmail}>
          {!isLoading ? tempEmail?.name : "Loading..."}
        </div>
        <div className={styles.icons}>
          {!isLoading && (
            <div className={styles.button}>
              <div className={styles.icon} onClick={onClickReset}>
                <Reset />
              </div>
              <div className={styles.icon} onClick={onClickCopy}>
                <Copy />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={styles.listEmail}>
        {listEmail?.length
          ? listEmail?.map((item) => (
              <div
                key={item.mail_id}
                className={styles.email}
                onClick={() => onClickEmail(item.mail_id)}
              >
                {item.mail_subject}
              </div>
            ))
          : "No emails"}
      </div>
    </div>
  );
}
