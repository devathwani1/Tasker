import React, { useContext, useEffect, useRef, useState } from 'react';
import { BsThreeDotsVertical } from "react-icons/bs";
import type { TaskType } from '../providers/Types';
import { useDeleteItem } from '../providers/hooks';

const TaskMenu = ({task,fetchData} : {task : TaskType,fetchData : () => void}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isSuccessfull, deleteTask } = useDeleteItem();
  const taskMenuRef = useRef<HTMLDivElement>(null);
  const OPTIONS = ['Delete', 'Open'];

  useEffect(() => {
    const handleClickedOutside = (event: MouseEvent) => {
      if (taskMenuRef.current && !taskMenuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickedOutside);
    return () => document.removeEventListener('mousedown', handleClickedOutside);
  }, []);

  useEffect(() => {
    if (isSuccessfull) {
      fetchData()
    }
  }, [isSuccessfull]);

  const handleOptionClick = (option: string) => {
    if (option === 'Delete') {
      deleteTask(task.id);
    } else if (option === 'Open') {
      console.log("Open task", task.id);
    }
    setIsOpen(false); 
  };

  return (
    <div ref={taskMenuRef} className="font-semibold relative">
      <div onClick={() => setIsOpen(prev => !prev)} className={`${isOpen && 'text-gray-600'} p-2 rounded-full`}>
        <BsThreeDotsVertical size={30} />
      </div>

      {isOpen && (
        <ul className="absolute right-3.5 bg-black text-black w-40 flex flex-col rounded-2xl overflow-hidden shadow-lg">
          {OPTIONS.map(option => (
            <li
              key={option}
              onClick={() => handleOptionClick(option)}
              className="p-3 bg-white hover:bg-neutral-200 cursor-pointer"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskMenu;
