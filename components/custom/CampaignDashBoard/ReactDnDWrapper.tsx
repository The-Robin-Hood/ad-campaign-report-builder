// DnDWrapper.tsx
import React, { ReactNode } from "react";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const DND_ITEM_TYPE = "DND_ITEM";

interface DraggableItemProps {
  children: ReactNode;
}

interface DroppableAreaProps {
  children: ReactNode;
  onDrop: (item: Element) => void;
}

interface DnDWrapperProps {
  children: ReactNode;
  onDrop: (item: Element) => void;
}

const DraggableItem: React.FC<DraggableItemProps> = ({ children }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: DND_ITEM_TYPE,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
      }}
    >
      {children}
    </div>
  );
};

const DroppableArea: React.FC<DroppableAreaProps> = ({ onDrop, children }) => {
  const [{ isOver }, dropRef] = useDrop({
    accept: DND_ITEM_TYPE,
    drop: (item) => {
      console.log(item);
      onDrop(item);
    },
    collect(monitor) {
      return {
        isOver: monitor.isOver(),
      };
    },
  });

  return (
    <div
      ref={dropRef}
      style={{
        padding: "16px",
        border: "2px dashed gray",
        minHeight: "100px",
      }}
    >
      {children}
    </div>
  );
};

const DnDWrapper: React.FC<DnDWrapperProps> = ({ children, onDrop }) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <DroppableArea onDrop={onDrop}>
        <DraggableItem>{children}</DraggableItem>
      </DroppableArea>
    </DndProvider>
  );
};

export default DnDWrapper;
