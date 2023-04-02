import java.util.Scanner;
class Main {

public static int test2(int ans) {
        return ans+10;
}

public static String test(int a, String name, boolean show) {

    return a + " " + name + " " + show +" "+test2(a);
 }	public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
		int a = Integer.parseInt(sc.nextLine());
		String name = sc.nextLine();
		boolean show = Boolean.parseBoolean(sc.nextLine());

 
   System.out.println(test(a,name,show));
}
}