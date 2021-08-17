import { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

interface ListItemTypes {
	id: string;
	task: string;
}

interface ItemTypes {
	todo: ListItemTypes[];
	doing: ListItemTypes[];
	done: ListItemTypes[];
}

const Board = () => {
	const [items, setItems] = useState<ListItemTypes[]>();
	const [doing, setDoing] = useState<ListItemTypes[]>();
	const [done, setDone] = useState<ListItemTypes[]>();

	useEffect(() => {
		fetch("/data.json")
			.then((res) => res.json() as Promise<ItemTypes>)
			.then((data) => {
				setItems(data.todo);
				setDoing(data.doing);
				setDone(data.done);
			});
	}, []);

	const addStyle = (isDraggingOver: boolean) => ({
		background: isDraggingOver ? "#98c3f9" : "",
	});

	const handleDragEnd = (result: any) => {
		const { source, destination } = result;

		if (!destination) return;
		const from = source.index;
		const to = destination.index;

		const existingItems = items;
		// remove dragged item from items array
		const removeItem: any = existingItems?.splice(from, 1);
		// add dragged item to destination in items array
		existingItems?.splice(to, 0, removeItem[0]);
		// set new updated array
		setItems(existingItems);
	};

	return (
		<div className="w-3/4 block mx-auto">
			<h1 className="font-bold text-center text-2xl mt-8">Board DnD</h1>
			<p className="text-center">
				<i>A beautiful drag n drop app for productivity</i>
			</p>

			{/* DnD Section */}
			<DragDropContext onDragEnd={handleDragEnd}>
				<div className="wrapper flex gap-4 mt-6">
					<div className="flex w-1/3">
						<Droppable droppableId="droppable-1">
							{(provided, snapshot) => (
								<div
									className="bg-blue-200 w-full px-4 py-0 pb-6 rounded-sm"
									ref={provided.innerRef}
									style={addStyle(snapshot.isDraggingOver)}
								>
									<div className="board-title text-center font-bold py-4">
										TODO
									</div>
									{items?.map((item, idx) => (
										<Draggable
											key={item.id}
											draggableId={item.id}
											index={idx}
										>
											{(provided, _) => (
												<div
													className="mb-2 bg-white px-4 py-2 rounded-sm"
													ref={provided.innerRef}
													{...provided.draggableProps}
													{...provided.dragHandleProps}
												>
													{item.task}
												</div>
											)}
										</Draggable>
									))}
									{provided.placeholder}
								</div>
							)}
						</Droppable>
					</div>
					<div className="flex w-1/3">
						<Droppable droppableId="droppable-2">
							{(provided, snapshot) => (
								<div
									className="bg-blue-200 w-full px-4 py-0 pb-6 rounded-sm"
									ref={provided.innerRef}
									style={addStyle(snapshot.isDraggingOver)}
								>
									<div className="board-title text-center font-bold py-4">
										DOING
									</div>
									{doing?.map((item, idx) => (
										<Draggable
											key={item.id}
											draggableId={item.id}
											index={idx}
										>
											{(provided, _) => (
												<div
													className="mb-2 bg-white px-4 py-2 rounded-sm"
													ref={provided.innerRef}
													{...provided.draggableProps}
													{...provided.dragHandleProps}
												>
													{item.task}
												</div>
											)}
										</Draggable>
									))}
									{provided.placeholder}
								</div>
							)}
						</Droppable>
					</div>
					<div className="flex w-1/3">
						<Droppable droppableId="droppable-3">
							{(provided, snapshot) => (
								<div
									className="bg-blue-200 w-full px-4 py-0 pb-6 rounded-sm"
									ref={provided.innerRef}
									style={addStyle(snapshot.isDraggingOver)}
								>
									<div className="board-title text-center font-bold py-4">
										DONE
									</div>
									{done?.map((item, idx) => (
										<Draggable
											key={item.id}
											draggableId={item.id}
											index={idx}
										>
											{(provided, _) => (
												<div
													className="mb-2 bg-white px-4 py-2 rounded-sm"
													ref={provided.innerRef}
													{...provided.draggableProps}
													{...provided.dragHandleProps}
												>
													{item.task}
												</div>
											)}
										</Draggable>
									))}
									{provided.placeholder}
								</div>
							)}
						</Droppable>
					</div>
				</div>
			</DragDropContext>
		</div>
	);
};

export default Board;
