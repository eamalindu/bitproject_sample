package lk.bitproject;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@SpringBootApplication
@RestController
public class BitprojectApplication {

	public static void main(String[] args) {
		SpringApplication.run(BitprojectApplication.class, args);
		System.out.println("hello");

		test();
	}

	public static void test(){
		System.out.println("test");
	}

	@RequestMapping(value = {"/" , "/index"})
	//return plain html
	public String testData(){
		return "<h1>Spring</h1>";
	}

	@RequestMapping(value = "/admin")
	//how to return a html file
	public ModelAndView testUI(){
		ModelAndView testview = new ModelAndView();
		testview.setViewName("test.html");
		return testview;
	}

	@RequestMapping(value = "/cat")
	public String meow(){
		return "<h1>Meow Meow</h1><img src='https://i.pinimg.com/originals/44/a2/43/44a243f8b38edd95a35f725f3b80219e.gif'>";
	}

	@RequestMapping(value = "/dog")
	public ModelAndView dogView(){
		ModelAndView dogView = new ModelAndView();
		dogView.setViewName("dog.html");
		return dogView;
	}

	//new mapping style
		//@GetMapping(value = "/home")

	//old mapping style
		//@RequestMapping(value = "/home",method = RequestMethod.GET)


}
