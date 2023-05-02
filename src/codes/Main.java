import java.util.Scanner;
class Main {
	

public static int test2(int ans) {
        return ans+10;
}

public static int test(int a, String name, boolean show) {
    return a;
 }
public static void main(String[] args) { 
 
 Object [][] input = {{2,"hih",true},{3,"puu",false},{4,"iij",false},{23,"iij",false},{12,"iij",false},{9,"iij",false}};
 for(Object[] v: input) {
 int a = (int) v[0];
String name = (String) v[1];
boolean show = (boolean) v[2];
 
System.out.println(test(a,name,show));
}
}
}