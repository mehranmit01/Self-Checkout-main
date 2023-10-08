package com.example.selfcheckout.ui.home;

import static android.content.Context.MODE_PRIVATE;

import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageButton;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.ActionBar;
import androidx.appcompat.app.ActionBarDrawerToggle;
import androidx.appcompat.app.AppCompatActivity;
import androidx.cardview.widget.CardView;
import androidx.core.view.GravityCompat;
import androidx.drawerlayout.widget.DrawerLayout;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProvider;

import com.example.selfcheckout.BottomBar;
import com.example.selfcheckout.MainActivity;
import com.example.selfcheckout.NavigationUtils;
import com.example.selfcheckout.R;
import com.example.selfcheckout.Scanner;
import com.example.selfcheckout.databinding.FragmentHomeBinding;
import com.example.selfcheckout.ui.HelpCenter;
import com.example.selfcheckout.ui.Offers;
import com.google.android.material.navigation.NavigationView;

import java.sql.SQLOutput;

public class HomeFragment extends Fragment {

//    DrawerLayout drawerLayout;
//    NavigationView navigationView;
//    ActionBarDrawerToggle actionBarDrawerToggle;
    private FragmentHomeBinding binding;


//     @Override
//    public boolean onOptionsItemSelected(@NonNull MenuItem item) {
//
//        if(actionBarDrawerToggle.onOptionsItemSelected(item)){
//            return true;
//        }
//
//        return super.onOptionsItemSelected(item);
//
//    }

    public static final int MENU_ITEM_1 = R.id.navigation_home;
    public static final int MENU_ITEM_2 = R.id.navigation_dashboard;
    public static final int MENU_ITEM_3 = R.id.navigation_notifications;


    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {
        HomeViewModel homeViewModel =
                new ViewModelProvider(this).get(HomeViewModel.class);

        binding = FragmentHomeBinding.inflate(inflater, container, false);
        View root = binding.getRoot();

        if (isAdded()) {
            SharedPreferences sharedPreferences = getActivity().getSharedPreferences("user_details", Context.MODE_PRIVATE);
            String userID = sharedPreferences.getString("userId", "12345678");
            Log.d("BackendCheck", "userId: " + userID);
        }


        final CardView scannerBtn = binding.scannerBtn;
        NavigationUtils.setFragmentToActivityNavigationClickListener(scannerBtn, this, Scanner.class);

        final CardView helpcenterBtn = binding.helpCenterBtn;
        NavigationUtils.setFragmentToActivityNavigationClickListener(helpcenterBtn, this, HelpCenter.class);

        final CardView offerrBtn = binding.offerrBtn;
        NavigationUtils.setFragmentToActivityNavigationClickListener(offerrBtn, this, Offers.class);


        // Find the DrawerLayout
        DrawerLayout drawerLayout = root.findViewById(R.id.drawer_layout);

        // Find the button that will open the drawer
        ImageButton openDrawerButton = root.findViewById(R.id.menuButton);

        // Set a click listener for the button
        openDrawerButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Open the navigation drawer
                drawerLayout.openDrawer(GravityCompat.START);
            }
        });


        // Find the NavigationView
        NavigationView navigationView = root.findViewById(R.id.navigationView);

        // Set an OnNavigationItemSelectedListener to handle item clicks
        navigationView.setNavigationItemSelectedListener(new NavigationView.OnNavigationItemSelectedListener() {
            @Override
            public boolean onNavigationItemSelected(@NonNull MenuItem item) {
                // Handle item clicks here
                int itemId = item.getItemId();

                if (itemId == R.id.navigation_home) {
                    System.out.println("aaaaa");
                    // Handle the click on navigation_home
                    // Example: startActivity(new Intent(getActivity(), HomeActivity.class));
                } else if (itemId == R.id.navigation_dashboard) {
                    System.out.println("bbbb");
                    Intent intent = new Intent(getActivity(), Scanner.class);
                    startActivity(intent);
                    // Handle the click on navigation_dashboard
                    // Example: startActivity(new Intent(getActivity(), DashboardActivity.class));
                } else if (itemId == R.id.navigation_notifications) {
                    System.out.println("cccc");
                    Intent intent = new Intent(getActivity(), Offers.class);
                    startActivity(intent);

                    // Handle the click on navigation_notifications
                    // Example: startActivity(new Intent(getActivity(), NotificationsActivity.class));
                } else if (itemId == R.id.navigation_customersupport) {
                    System.out.println("ddd");
                    Intent intent = new Intent(getActivity(), HelpCenter.class);
                    startActivity(intent);

                    // Handle the click on navigation_notifications
                    // Example: startActivity(new Intent(getActivity(), NotificationsActivity.class));
                }



                // Close the drawer after handling the click
                DrawerLayout drawerLayout = root.findViewById(R.id.drawer_layout);
                drawerLayout.closeDrawer(GravityCompat.START);

                return true; // Return true to indicate that the item click is handled
            }
        });


//        //drawer menu
//        View view = inflater.inflate(R.layout.fragment_home, container, false);
//
//        drawerLayout = view.findViewById(R.id.drawer_layout);
//        navigationView = view.findViewById(R.id.navigationView);
//        actionBarDrawerToggle = new ActionBarDrawerToggle(getActivity(),drawerLayout,R.string.menu_open,R.string.close_menu);
//        drawerLayout.addDrawerListener(actionBarDrawerToggle);
//        actionBarDrawerToggle.syncState();
////        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
//
//        AppCompatActivity activity = (AppCompatActivity) getActivity();
//        if (activity != null) {
//            ActionBar actionBar = activity.getSupportActionBar();
//            if (actionBar != null) {
//                actionBar.setDisplayHomeAsUpEnabled(true);
//            }
//        }
//
//
//
//        ImageButton openDrawerButton = binding.menuButton;
//        openDrawerButton.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View v) {
//                System.out.println("xxxxx");
//                if (drawerLayout != null) {
//                    drawerLayout.openDrawer(GravityCompat.START);
//                    System.out.println("yyyyyy");
//
//                }
//            }
//        });
//
//        navigationView.setNavigationItemSelectedListener(new NavigationView.OnNavigationItemSelectedListener() {
//                @Override
//                public boolean onNavigationItemSelected(@NonNull MenuItem item) {
//                    // Handle item selection here
////                    switch (item.getItemId()) {
////                        case R.id.navigation_home:
////                            System.out.println("aaaaaa");
////                            // Handle item 1 click
////                            break;
////                        case R.id.navigation_dashboard:
////                            System.out.println("bbbb");
////
////                            // Handle item 2 click
////                            break;
////                        case R.id.navigation_notifications:
////                            System.out.println("cccccc");
////
////                            // Handle item 2 click
////                            break;
////                        // Add more cases for other menu items as needed
////                    }
//
//                    // Close the drawer
////                    drawerLayout.closeDrawers();
//                    return true;
//                }
//            });
//        navigationView.setItemIconTintList(null);


        final ImageButton logout = binding.logoutButton;
        //NavigationUtils.setFragmentToActivityNavigationClickListener(logout, this, MainActivity.class);
        logout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Create an AlertDialog to confirm logout
                new AlertDialog.Builder(getContext())
                        .setTitle("Logout")
                        .setMessage("Are you sure you want to logout?")
                        .setPositiveButton("Yes", new DialogInterface.OnClickListener() {
                            public void onClick(DialogInterface dialog, int which) {
                                // User pressed "Yes", handle the logout
                                handleLogout();
                            }
                        })
                        .setNegativeButton("No", null)
                        .setIcon(android.R.drawable.ic_dialog_alert)
                        .show();
            }
        });

       // final TextView textView = binding.textHome;
        //homeViewModel.getText().observe(getViewLifecycleOwner(), textView::setText);
        return root;
    }


    @Override
    public void onDestroyView() {
        super.onDestroyView();
        binding = null;
    }

    private void handleLogout() {
        // Clear the isLoggedIn flag from SharedPreferences
        SharedPreferences sharedPreferences = getContext().getSharedPreferences("user_details", Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = sharedPreferences.edit();
        editor.putBoolean("isLoggedIn", false);
        editor.apply();

        // Navigate to the main activity
        Intent intent = new Intent(getContext(), MainActivity.class);
        startActivity(intent);

        // Close the current activity
        if (getActivity() != null) {
            getActivity().finish();
        }
    }

    void openHome(){
        Intent intent = new Intent(getActivity(),HomeFragment.class);
        startActivity(intent);
    }

}