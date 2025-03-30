import styled from "styled-components";
import LunarCalendar from "./Calendar";
import ToDoList from "./ToDoList";

export default function Schedule() {
  return (
    <StyledSchedule>
      <div className="calendarWrap">
        <LunarCalendar />
      </div>
      <div className="toDoList">
        <ToDoList/>
      </div>
    </StyledSchedule>
  );
}

const StyledSchedule = styled.div`
    display:flex;
    .toDoList {

    }
`;
