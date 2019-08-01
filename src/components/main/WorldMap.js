import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import { getRooms, initializePlayer } from "../../actions";
import { forEachNode } from "../../utils/rooms";

import { theme1 } from "../../styles/theme";

function MainPage(props) {
  const { rooms, getRooms, initializePlayer } = props;

  const worldMap = useRef(null);
  const container = useRef(null);

  console.log(container);

  let canvas_width = container.current && container.current.offsetWidth;
  let canvas_height = container.current && container.current.offsetHeight;
  console.log({ canvas_width, canvas_height });

  useEffect(() => {
    getRooms();
    initializePlayer();
  }, [getRooms, initializePlayer]);

  useEffect(() => {
    if (!worldMap.current) {
      return;
    }

    const drawRooms = () => {
      const ctx = worldMap.current.getContext("2d");

      function draw(room) {
        ctx.lineWidth = 1;
        ctx.strokeStyle = theme1.silverSand;
        let x = room.x * (canvas_width / 10);
        let y = room.y * (canvas_height / 10);

        if (room.x === 10 && room.y === 10) {
          ctx.fillStyle = theme1.onyx;
        } else {
          ctx.fillStyle = theme1.silverSand;
        }

        ctx.strokeRect(x, y, canvas_width / 12, canvas_height / 12);
        ctx.fillRect(x, y, canvas_width / 12, canvas_height / 12);

        ctx.lineWidth = 20;
        ctx.strokeStyle = theme1.silverSand;

        let roomCenter = [x + canvas_width / 24, y + canvas_height / 24];
        if (room.e_to !== null) {
          // ctx.fillStyle = "blue";
          // ctx.strokeStyle = "blue";
          ctx.moveTo(...roomCenter);
          ctx.lineTo(roomCenter[0] + canvas_width / 10, roomCenter[1]);
          ctx.stroke();
        }
        if (room.s_to !== null) {
          // ctx.strokeStyle = "red";
          ctx.moveTo(...roomCenter);
          ctx.lineTo(roomCenter[0], roomCenter[1] + canvas_height / 10);
          ctx.stroke();
        }
      }

      function drawText(room) {
        let x = room.x * (canvas_width / 10) - 12;
        let y = room.y * (canvas_height / 10);
        let roomCenter = [x + canvas_width / 24, y + canvas_height / 24];

        ctx.fillStyle = theme1.onyx;
        ctx.fillText(room.id + 184, ...roomCenter);
      }

      if (rooms.length > 0) {
        forEachNode(rooms, draw);
        // forEachNode(rooms, drawText);
        rooms.forEach(drawText);
        // rooms.forEach(draw);
      }
    };

    drawRooms();
  }, [rooms, canvas_width, canvas_height]);

  return (
    <Map>
      <div ref={container} className="map-container">
        <canvas ref={worldMap} width={canvas_width} height={canvas_height} />
      </div>
    </Map>
  );
}

export default connect(
  state => ({
    rooms: state.player.rooms
    // player: state.player.player
  }),
  {
    getRooms,
    initializePlayer
  }
)(MainPage);

const Map = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100%;
  width: 100%;

  color: white;
  background: ${theme1.onyx};

  padding: 1% 0 0 1%;

  .map-container {
    /* border: 1px solid blue; */
    width: 100%;
    height: 100%;

    canvas {
      width: 100%;
      height: 100%;
    }
  }
`;
