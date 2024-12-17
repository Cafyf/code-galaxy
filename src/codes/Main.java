import java.util.Scanner;
class Main {
	
public static boolean sleepIn(boolean weekday, boolean vacation) {

        return true;
}
public static void main(String[] args) { 
 
 Object [][] input = {{false, false},{true, false},{false, true},{true, true}};
 for(Object[] v: input) {
 boolean weekday = (boolean) v[0];
boolean vacation = (boolean) v[1];
 
System.out.println(sleepIn(weekday,vacation));
}
}
}