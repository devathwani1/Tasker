import  { useContext, useEffect, useRef, useState } from 'react';
import { BsThreeDotsVertical } from "react-icons/bs";
import type { TaskType } from '../providers/Types';
import { useDeleteItem } from '../providers/hooks';
import { PutTaskContext, UpdateTaskContext } from '../providers/Contexts';

const TaskMenu = ({task,fetchData} : {task : TaskType,fetchData : () => void}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenUp,setIsOpenUp] = useState(false);
  const { isSuccessfull, deleteTask } = useDeleteItem();
  const taskMenuRef = useRef<HTMLDivElement>(null);
  const OPTIONS = ['Delete', 'Open','Complete'];
  const updateTask = useContext(UpdateTaskContext)
  const putTaskContext = useContext(PutTaskContext)

  useEffect(() => {
    const handleClickedOutside = (event: MouseEvent) => {
      if (taskMenuRef.current && !taskMenuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickedOutside);
    return () => document.removeEventListener('mousedown', handleClickedOutside);
  }, []);

  useEffect(()=>{
    if(isOpen && taskMenuRef.current){
      const rect = taskMenuRef.current.getBoundingClientRect()
      const viewportHeight = window.innerHeight;
      const dropdownHeight = OPTIONS.length * 48

      setIsOpenUp(rect.bottom + dropdownHeight < viewportHeight)
    }
  },[isOpen])

  useEffect(() => {
    if (isSuccessfull) {
      fetchData()
    }
  }, [isSuccessfull]);

  useEffect(()=>{
    if(putTaskContext?.putTaskData.state == 'COMPLEATED'){
      putTaskContext.updateTask()
    }
  },[putTaskContext?.putTaskData])

  const handleOptionClick = async (option: string) => {
    if (option === 'Delete') {
      deleteTask(task.id);
    } else if (option === 'Open') {
      updateTask?.setUpdateTaskVisible(true)
      putTaskContext?.setPutTaskData({
        ...task,
        'date' : task.pendingOn.split('T')[0],
        'time' : task.pendingOn.split('T')[1].slice(0,5)
      })
    } else if (option === 'Complete'){
      await putTaskContext?.setPutTaskData(prev => ({
        ...prev,
        'id' : task.id,
        'state' : 'COMPLEATED'
      }))
    }
    setIsOpen(false); 
  };

  return (

    <div ref={taskMenuRef} className="font-semibold relative">
      <div onClick={() => setIsOpen(prev => !prev)} className={`${isOpen && 'text-gray-600'} p-2 rounded-full`}>
        <BsThreeDotsVertical size={30} />
      </div>

      {isOpen && (
        <ul className={`absolute z-50 right-3.5 bg-black text-black w-40 flex flex-col rounded-2xl overflow-hidden shadow-lg ${isOpenUp ? 'top-full' : 'bottom-full'}`}>
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
