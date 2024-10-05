import java.util.Scanner;
class Main {
	
public static boolean makes10(int a, int b)  {

        return true;
}
public static void main(String[] args) { 
 
 Object [][] input = {{9, 10},{9, 9},{1, 9},{10, 1},{10, 10},{8, 2},{8, 3},{10, 42},{12,-2}};
 for(Object[] v: input) {
 int a = (int) v[0];
int b = (int) v[1];
 
System.out.println(makes10(a,b));
}
}
}