import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  changeSearchParam,
  changeSortParam,
  changeStatusParam,
  selectFilteredTodosPage,
} from "../../redux/slices/filteredTodosSlice";
import { selectTodosPage } from "../../redux/slices/todosSlice";
import { getTodos } from "../../redux/selectors/todosSelectors";
import {
  getSearchParam,
  getSortParam,
  getStatusParam,
} from "../../redux/selectors/filteredTodosSelectors";
import { todosSortValues, todosStatusValues } from "../../types";

import styles from "./Sorting.module.scss";

export const Sorting: FC = () => {
  const todos = useSelector(getTodos);
  const searchParam = useSelector(getSearchParam);
  const sortParam = useSelector(getSortParam);
  const statusParam = useSelector(getStatusParam);

  const dispatch = useDispatch();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeSearchParam({ todos, updatedSearchParam: e.target.value }));
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(
      changeSortParam({
        todos,
        updatedSortedParam: e.target.value as todosSortValues,
      })
    );
    dispatch(selectFilteredTodosPage(1));
    dispatch(selectTodosPage(1));
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(
      changeStatusParam({
        todos,
        updatedStatusParam: e.target.value as todosStatusValues,
      })
    );
    dispatch(selectFilteredTodosPage(1));
    dispatch(selectTodosPage(1));
  };

  return (
    <div className={styles.Sorting}>
      <input
        className={styles.Sorting__searchInput}
        type="text"
        value={searchParam}
        onChange={handleSearchChange}
        placeholder="Search Todo"
      />
      <div className={styles.Sorting__selects}>
        <select value={sortParam} onChange={handleSortChange}>
          {Object.values(todosSortValues).map((value) => (
            <option value={value} key={value}>
              {value[0].toUpperCase().concat(value.slice(1))}
            </option>
          ))}
        </select>
        <select value={statusParam} onChange={handleStatusChange}>
          {Object.values(todosStatusValues).map((status) => (
            <option value={status} key={status}>
              {status[0].toUpperCase().concat(status.slice(1))}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
