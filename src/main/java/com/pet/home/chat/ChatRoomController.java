package com.pet.home.chat;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/chat/*")
public class ChatRoomController {

	@Autowired
	private ChatRoomDAO chatRoomDAO;
	
	@GetMapping("room")
	public String room() {
		return "/chat/room";
	}
	
	@GetMapping("list")
	public List<ChatRoomDTO> getRoomList() {
		return chatRoomDAO.getListAllRoom();
	} 
	
	@PostMapping("room")
	@ResponseBody
	public ChatRoomDTO addRoom(@RequestParam String name) {
		return chatRoomDAO.addChatRoom(name);
	}
	
	@GetMapping("room/enter/{roomId}")
	public String getRoomDetail(Model model, @PathVariable String roomId) {
		model.addAttribute("roomId",roomId);
		return "/chat/detail";
	}
	
	@GetMapping("room/{roomId}")
	@ResponseBody
	public ChatRoomDTO getRoomInfo(@PathVariable String roomId) {
		return chatRoomDAO.getRoomById(roomId);
	}
	
}
