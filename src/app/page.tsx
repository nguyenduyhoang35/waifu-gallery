/* eslint-disable @next/next/no-img-element */
"use client";
import "./styles.scss";
import { useRef, useState, useEffect, useLayoutEffect } from "react";
import { IData } from "./types";
import { Fullscreen } from "lucide-react";

import {
	Dialog,
	DialogContent,
	DialogTrigger,
} from "@/components/ui/dialog";

export default function Home() {
	const galleryRef = useRef(null);
	const [open, setOpen] = useState<string | undefined>();
	const [status, setStatus] = useState("loading");
	const [studentList, setStudentList] = useState<IData[]>();
	const [columnData, setColumnData] = useState<{ firstRow: number; twoRows: number }>({ firstRow: 0, twoRows: 0 });

	const handleResize = () => {
		const galleryElm = galleryRef.current;
		if (galleryElm) {
			const gridComputedStyle = window.getComputedStyle(galleryElm);
			const gridColumnCount = gridComputedStyle.getPropertyValue("grid-template-columns").split(" ").length;
			const firstRow = (gridColumnCount - (gridColumnCount % 2)) / 2;
			const twoRows = gridColumnCount % 2 === 1 ? firstRow * 2 : firstRow * 2 - 1;
			setColumnData({
				firstRow: firstRow,
				twoRows: twoRows,
			});
		}
	};

	const isMovedLeft = (order: number) => {
		const { firstRow, twoRows } = columnData;
		return (order - firstRow) % twoRows === 1;
	};

	useEffect(() => {
		setStatus("loading");
		fetch(`https://api.dotgg.gg/bluearchive/characters`)
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				console.log(data);
				if (data?.length > 0) {
					setStudentList(data);
					setStatus("success");
				} else {
					setStatus("error api");
				}
			})
			.catch((error: any) => {
				setStatus(error);
			});
	}, []);

	useLayoutEffect(() => {
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, [status]);

	return (
		<div className="App">
			{status === "success" ? (
				<div
					className={`gallery gallery--${status} gallery--honeycomb`}
					ref={galleryRef}>
					{(studentList || []).map((item: IData, index) => (
						<div
							key={item._id}
							className={`item cursor-pointer flex flex-col items-center justify-center relative ${
								isMovedLeft(index + 1) ? "moved-left" : ""
							}`}>
							<Dialog>
								<DialogTrigger>
									<Fullscreen
										className="preview hidden absolute top-0 right-0 bg-black/20"
										onClick={() => setOpen(`https://images.dotgg.gg/bluearchive/characters/${item.imgSmall}`)}
									/>
								</DialogTrigger>
								<DialogContent className="w-[50vh] max-w-full m-auto bg-[#1b2126] border-[#434A56]">
									<img
										loading="lazy"
										src={`https://images.dotgg.gg/bluearchive/characters/${item.img}`}
										alt={item.name}
									/>
								</DialogContent>
							</Dialog>

							<img
								loading="lazy"
								src={`https://images.dotgg.gg/bluearchive/characters/${item.imgSmall}`}
								alt={item.name}
								onClick={() => {
									const url = `https://bluearchive.gg/characters/${item.url}`;
									window.open(url);
								}}
							/>
							<div className="color-[#f2f2f2] absolute bottom-0 bg-black/10 w-full hidden">{item.name}</div>
						</div>
					))}
				</div>
			) : (
				<div className="loading">{status}</div>
			)}
		</div>
	);
}
